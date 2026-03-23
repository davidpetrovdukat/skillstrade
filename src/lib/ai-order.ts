import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import mammoth from 'mammoth';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { createRequire } from 'module';
import path from 'path';
import { Types } from 'mongoose';
import { Resend } from 'resend';
import { connectMongo } from '@/lib/db';
import { buildDeveloperPrompt, buildUserPrompt, getPromptKeyForService, getServicePromptConfig } from '@/lib/ai-document-prompts';
import { AIDocumentSchema, AI_DOCUMENT_FORMAT_NAME, type AIDocument } from '@/lib/ai-document-schema';
import { getResendFromEmail } from '@/lib/email';
import { renderOrderDocumentPdf } from '@/lib/order-pdf';
import { Order, OrderStatus, AIDocumentStatus, type IOrderServiceSnapshot, type IOrderSelectedAddonSnapshot } from '@/models/Order';
import { User } from '@/models/User';
import type { IService } from '@/models/Service';

const MAX_TEXT_CHARS_PER_ATTACHMENT = 12000;
const MAX_TOTAL_ATTACHMENT_TEXT_CHARS = 48000;
const ORDER_READY_EMAIL_SUBJECT_PREFIX = 'Your Skills-Trade document is ready';

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const textExtensions = new Set(['.txt', '.md', '.csv', '.json']);
const docxExtensions = new Set(['.docx']);
const pdfExtensions = new Set(['.pdf']);
const require = createRequire(import.meta.url);

type LegacyPdfParseResult = {
    text?: string;
};

type LegacyPdfParse = (dataBuffer: Buffer) => Promise<LegacyPdfParseResult>;

function getLegacyPdfParse() {
    return require('pdf-parse/lib/pdf-parse.js') as LegacyPdfParse;
}

function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured.');
    }

    return new OpenAI({ apiKey });
}

function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        return null;
    }

    return new Resend(process.env.RESEND_API_KEY);
}

export function getOpenAIModel() {
    return process.env.OPENAI_MODEL || 'gpt-5.4-mini';
}

export function isAIDocumentTestMode() {
    const value = process.env.AI_DOCUMENT_TEST_MODE;
    return value === '1' || value === 'true' || value === 'yes';
}

export function getAppBaseUrl() {
    return (
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.NEXTAUTH_URL ||
        'http://localhost:3000'
    ).replace(/\/$/, '');
}

function getMimeTypeFromExtension(extension: string) {
    switch (extension) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.webp':
            return 'image/webp';
        case '.gif':
            return 'image/gif';
        default:
            return 'application/octet-stream';
    }
}

function sanitizeFilename(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function truncateText(value: string, maxChars: number) {
    const normalized = value.replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxChars) {
        return normalized;
    }

    return `${normalized.slice(0, Math.max(0, maxChars - 3)).trim()}...`;
}

function getPublicAbsolutePath(publicPath: string) {
    const normalized = publicPath.replace(/^\/+/, '').replace(/\//g, path.sep);
    return path.join(process.cwd(), 'public', normalized);
}

function getOrderUploadsDirectory(orderId: string) {
    return path.join(process.cwd(), 'public', 'uploads', 'orders', orderId, 'inputs');
}

function getOrderGeneratedDirectory(orderId: string) {
    return path.join(process.cwd(), 'public', 'generated-documents', 'orders', orderId);
}

async function ensureDirectory(directoryPath: string) {
    await mkdir(directoryPath, { recursive: true });
}

async function cleanupOrderArtifacts(orderId: string) {
    await rm(path.join(process.cwd(), 'public', 'uploads', 'orders', orderId), { recursive: true, force: true });
    await rm(path.join(process.cwd(), 'public', 'generated-documents', 'orders', orderId), { recursive: true, force: true });
}

function toDataUrl(buffer: Buffer, mimeType: string) {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

function getOrderReadyEmailHtml(input: {
    firstName?: string;
    serviceTitle: string;
    orderId: string;
    downloadUrl: string;
}) {
    const { firstName, serviceTitle, orderId, downloadUrl } = input;

    return `
        <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
            <p>Hello ${firstName || 'there'},</p>
            <p>Your Skills-Trade document for <strong>${serviceTitle}</strong> is ready.</p>
            <p>Order ID: <strong>${orderId.slice(-8).toUpperCase()}</strong></p>
            <p>You can download it directly from your dashboard here:</p>
            <p><a href="${downloadUrl}" style="color: #0f766e;">${downloadUrl}</a></p>
            <p>We have also attached the PDF to this email for convenience.</p>
            <p>Skills-Trade</p>
        </div>
    `;
}

function getRandomAvailabilityDate(fromDate: Date) {
    const minHours = 3;
    const maxHours = 6;
    const randomMinutes = Math.floor((minHours * 60) + (Math.random() * ((maxHours - minHours) * 60)));
    return new Date(fromDate.getTime() + randomMinutes * 60 * 1000);
}

function formatErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Unexpected error';
}

export function buildOrderServiceSnapshot(input: {
    service: Pick<IService, 'title' | 'category' | 'overview' | 'deliverables' | 'deliveryDays' | 'priceTokens'>;
    availableUpgrades: IOrderSelectedAddonSnapshot[];
    selectedAddons: IOrderSelectedAddonSnapshot[];
}): IOrderServiceSnapshot {
    const { service, availableUpgrades, selectedAddons } = input;

    return {
        title: service.title,
        category: service.category,
        overview: service.overview,
        deliverables: service.deliverables || [],
        deliveryDays: service.deliveryDays || 7,
        priceTokens: service.priceTokens,
        availableUpgrades,
        selectedAddons,
    };
}

export async function saveOrderInputAttachments(orderId: string, files: File[]) {
    if (files.length === 0) {
        return [];
    }

    const uploadDir = getOrderUploadsDirectory(orderId);
    await ensureDirectory(uploadDir);

    const savedPaths: string[] = [];

    for (const [index, file] of files.entries()) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = path.extname(file.name) || '';
        const baseName = sanitizeFilename(path.basename(file.name, extension)) || `attachment-${index + 1}`;
        const filename = `${Date.now()}-${index + 1}-${baseName}${extension.toLowerCase()}`;
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        savedPaths.push(`/uploads/orders/${orderId}/inputs/${filename}`);
    }

    return savedPaths;
}

async function extractAttachmentContext(publicPaths: string[]) {
    const attachmentSummaries: string[] = [];
    const imageInputs: Array<{ type: 'input_image'; image_url: string; detail: 'auto' }> = [];
    let usedChars = 0;

    for (const publicPath of publicPaths) {
        const absolutePath = getPublicAbsolutePath(publicPath);
        const filename = path.basename(absolutePath);
        const extension = path.extname(absolutePath).toLowerCase();

        try {
            const fileBuffer = await readFile(absolutePath);

            if (imageExtensions.has(extension)) {
                imageInputs.push({
                    type: 'input_image',
                    image_url: toDataUrl(fileBuffer, getMimeTypeFromExtension(extension)),
                    detail: 'auto',
                });
                attachmentSummaries.push(`${filename}: image attachment supplied by the customer.`);
                continue;
            }

            let extractedText = '';

            if (textExtensions.has(extension)) {
                extractedText = fileBuffer.toString('utf8');
            } else if (pdfExtensions.has(extension)) {
                const pdfParse = getLegacyPdfParse();
                const parsed = await pdfParse(fileBuffer);
                extractedText = parsed.text || '';
            } else if (docxExtensions.has(extension)) {
                const parsed = await mammoth.extractRawText({ buffer: fileBuffer });
                extractedText = parsed.value || '';
            } else {
                attachmentSummaries.push(`${filename}: attached file could not be parsed automatically; use the filename as context only.`);
                continue;
            }

            const remainingChars = MAX_TOTAL_ATTACHMENT_TEXT_CHARS - usedChars;
            if (remainingChars <= 0) {
                attachmentSummaries.push(`${filename}: text was omitted because the attachment context limit was reached.`);
                continue;
            }

            const clippedText = truncateText(extractedText, Math.min(MAX_TEXT_CHARS_PER_ATTACHMENT, remainingChars));
            if (!clippedText) {
                attachmentSummaries.push(`${filename}: file was parsed but no usable text was extracted.`);
                continue;
            }

            usedChars += clippedText.length;
            attachmentSummaries.push(`${filename}: ${clippedText}`);
        } catch (error) {
            attachmentSummaries.push(`${filename}: attachment processing failed (${formatErrorMessage(error)}).`);
        }
    }

    return { attachmentSummaries, imageInputs };
}

async function buildOpenAIRequest(input: {
    serviceSnapshot: IOrderServiceSnapshot;
    projectBrief: string;
    inputAttachments: string[];
}) {
    const config = getServicePromptConfig(input.serviceSnapshot.title);
    const promptKey = getPromptKeyForService(input.serviceSnapshot.title);
    const attachmentContext = await extractAttachmentContext(input.inputAttachments);

    const userContent: Array<
        | { type: 'input_text'; text: string }
        | { type: 'input_image'; image_url: string; detail: 'auto' }
    > = [
        {
            type: 'input_text',
            text: buildUserPrompt({
                serviceSnapshot: input.serviceSnapshot,
                projectBrief: input.projectBrief,
                attachmentSummaries: attachmentContext.attachmentSummaries,
            }),
        },
        ...attachmentContext.imageInputs,
    ];

    return {
        promptKey,
        requestBody: {
            model: getOpenAIModel(),
            input: [
                {
                    role: 'developer' as const,
                    content: [
                        {
                            type: 'input_text' as const,
                            text: buildDeveloperPrompt(config),
                        },
                    ],
                },
                {
                    role: 'user' as const,
                    content: userContent,
                },
            ],
            text: {
                format: zodTextFormat(AIDocumentSchema, AI_DOCUMENT_FORMAT_NAME),
            },
        },
    };
}

function parseAIDocumentResponse(outputText: string) {
    const raw = JSON.parse(outputText);
    return AIDocumentSchema.parse(raw);
}

async function saveGeneratedPdf(input: {
    orderId: string;
    serviceTitle: string;
    document: AIDocument;
}) {
    const { orderId, serviceTitle, document } = input;
    const outputDir = getOrderGeneratedDirectory(orderId);
    await ensureDirectory(outputDir);

    const safeBaseName = sanitizeFilename(serviceTitle) || 'skills-trade-document';
    const filename = `${safeBaseName}-document.pdf`;
    const publicPath = `/generated-documents/orders/${orderId}/${filename}`;
    const absolutePath = path.join(outputDir, filename);

    const buffer = await renderOrderDocumentPdf({
        document,
        orderId,
        serviceTitle,
    });

    await writeFile(absolutePath, buffer);

    return {
        buffer,
        filename,
        publicPath,
    };
}

export async function submitBackgroundAIDocumentRequest(input: {
    serviceSnapshot: IOrderServiceSnapshot;
    projectBrief: string;
    inputAttachments: string[];
}) {
    const client = getOpenAIClient();
    const { promptKey, requestBody } = await buildOpenAIRequest(input);
    const response = await client.responses.create({
        ...requestBody,
        background: true,
    });

    return {
        promptKey,
        model: getOpenAIModel(),
        responseId: response.id,
    };
}

export async function generateImmediateAIDocument(input: {
    orderId: string;
    serviceSnapshot: IOrderServiceSnapshot;
    projectBrief: string;
    inputAttachments: string[];
}) {
    const client = getOpenAIClient();
    const { promptKey, requestBody } = await buildOpenAIRequest({
        serviceSnapshot: input.serviceSnapshot,
        projectBrief: input.projectBrief,
        inputAttachments: input.inputAttachments,
    });

    const response = await client.responses.create({
        ...requestBody,
        background: false,
    });

    if (response.status !== 'completed' || !response.output_text) {
        throw new Error(response.error?.message || 'OpenAI did not return a completed response.');
    }

    const document = parseAIDocumentResponse(response.output_text);
    const pdf = await saveGeneratedPdf({
        orderId: input.orderId,
        serviceTitle: input.serviceSnapshot.title,
        document,
    });

    const generatedAt = new Date();

    return {
        promptKey,
        model: getOpenAIModel(),
        responseId: response.id,
        document,
        pdf,
        generatedAt,
    };
}

async function markOrderFailed(orderId: string, errorMessage: string) {
    await Order.findByIdAndUpdate(orderId, {
        $set: {
            'aiDocument.status': AIDocumentStatus.FAILED,
            'aiDocument.error': errorMessage,
        },
    });
}

export async function processQueuedAIDocumentOrders(limit = 10) {
    await connectMongo();

    const orders = await Order.find({
        'aiDocument.status': AIDocumentStatus.REQUESTED,
        'aiDocument.openAIResponseId': { $exists: true, $ne: '' },
    })
        .sort({ createdAt: 1 })
        .limit(limit)
        .lean();

    let generatedCount = 0;
    let waitingCount = 0;
    let failedCount = 0;

    if (orders.length === 0) {
        return { generatedCount, waitingCount, failedCount };
    }

    const client = getOpenAIClient();

    for (const order of orders) {
        const orderId = order._id.toString();
        const responseId = order.aiDocument?.openAIResponseId;

        if (!responseId || !order.serviceSnapshot || !order.brief?.description) {
            await markOrderFailed(orderId, 'Order is missing AI generation metadata.');
            failedCount += 1;
            continue;
        }

        try {
            const response = await client.responses.retrieve(responseId);

            if (response.status === 'queued' || response.status === 'in_progress') {
                waitingCount += 1;
                continue;
            }

            if (response.status !== 'completed' || !response.output_text) {
                await markOrderFailed(orderId, response.error?.message || 'OpenAI response did not complete successfully.');
                failedCount += 1;
                continue;
            }

            const lockedOrder = await Order.findOneAndUpdate(
                { _id: order._id, 'aiDocument.status': AIDocumentStatus.REQUESTED },
                {
                    $set: {
                        'aiDocument.status': AIDocumentStatus.GENERATING,
                    },
                },
                { new: true }
            );

            if (!lockedOrder) {
                continue;
            }

            const document = parseAIDocumentResponse(response.output_text);
            const pdf = await saveGeneratedPdf({
                orderId,
                serviceTitle: lockedOrder.serviceSnapshot?.title || lockedOrder.brief?.title || 'skills-trade-document',
                document,
            });

            const generatedAt = new Date();
            const availableAt = isAIDocumentTestMode()
                ? generatedAt
                : getRandomAvailabilityDate(generatedAt);

            await Order.findByIdAndUpdate(order._id, {
                $set: {
                    status: OrderStatus.IN_PROGRESS,
                    deliveryDate: availableAt,
                    'aiDocument.status': AIDocumentStatus.GENERATED,
                    'aiDocument.error': '',
                    'aiDocument.generatedPdfPath': pdf.publicPath,
                    'aiDocument.generatedPdfFilename': pdf.filename,
                    'aiDocument.generatedAt': generatedAt,
                    'aiDocument.availableAt': availableAt,
                },
            });

            generatedCount += 1;
        } catch (error) {
            await markOrderFailed(orderId, formatErrorMessage(error));
            failedCount += 1;
        }
    }

    return { generatedCount, waitingCount, failedCount };
}

export async function releaseReadyAIDocumentOrders(limit = 10) {
    await connectMongo();

    const now = new Date();
    const orders = await Order.find({
        'aiDocument.status': AIDocumentStatus.GENERATED,
        'aiDocument.availableAt': { $lte: now },
    })
        .sort({ 'aiDocument.availableAt': 1 })
        .limit(limit)
        .lean();

    let releasedCount = 0;
    let failedCount = 0;

    for (const order of orders) {
        const lockedOrder = await Order.findOneAndUpdate(
            { _id: order._id, 'aiDocument.status': AIDocumentStatus.GENERATED },
            { $set: { 'aiDocument.status': AIDocumentStatus.RELEASING } },
            { new: true }
        );

        if (!lockedOrder) {
            continue;
        }

        const generatedPdfPath = lockedOrder.aiDocument?.generatedPdfPath;
        if (!generatedPdfPath) {
            await markOrderFailed(order._id.toString(), 'Generated PDF path is missing.');
            failedCount += 1;
            continue;
        }

        const nextAttachments = Array.from(new Set([...(lockedOrder.attachments || []), generatedPdfPath]));

        await Order.findByIdAndUpdate(order._id, {
            $set: {
                status: OrderStatus.COMPLETED,
                attachments: nextAttachments,
                deliveryDate: lockedOrder.aiDocument?.availableAt || lockedOrder.deliveryDate || new Date(),
                'aiDocument.status': AIDocumentStatus.RELEASED,
                'aiDocument.releasedAt': new Date(),
                'aiDocument.emailError': '',
            },
        });

        releasedCount += 1;
    }

    return { releasedCount, failedCount };
}

async function sendAIDocumentReadyEmail(orderId: string) {
    const resendClient = getResendClient();
    if (!resendClient) {
        return false;
    }

    const order = await Order.findById(orderId).lean();
    if (!order) {
        throw new Error('Order not found.');
    }

    const user = await User.findById(order.client).lean();
    if (!user?.email) {
        throw new Error('Client email is missing.');
    }

    const pdfPath = order.aiDocument?.generatedPdfPath;
    const pdfFilename = order.aiDocument?.generatedPdfFilename || 'skills-trade-document.pdf';
    if (!pdfPath) {
        throw new Error('Generated PDF path is missing.');
    }

    const fileBuffer = await readFile(getPublicAbsolutePath(pdfPath));
    const downloadUrl = `${getAppBaseUrl()}${pdfPath}`;

    await resendClient.emails.send({
        from: getResendFromEmail(),
        to: [user.email],
        subject: `${ORDER_READY_EMAIL_SUBJECT_PREFIX}: ${order.serviceSnapshot?.title || order.brief?.title || 'Your order'}`,
        html: getOrderReadyEmailHtml({
            firstName: user.firstName,
            serviceTitle: order.serviceSnapshot?.title || order.brief?.title || 'your order',
            orderId: order._id.toString(),
            downloadUrl,
        }),
        attachments: [
            {
                filename: pdfFilename,
                content: fileBuffer,
            },
        ],
    });

    await Order.findByIdAndUpdate(order._id, {
        $set: {
            'aiDocument.emailedAt': new Date(),
            'aiDocument.emailError': '',
        },
    });

    return true;
}

export async function sendPendingAIDocumentEmails(limit = 10) {
    await connectMongo();

    const orders = await Order.find({
        'aiDocument.status': AIDocumentStatus.RELEASED,
        'aiDocument.generatedPdfPath': { $exists: true, $ne: '' },
        $or: [
            { 'aiDocument.emailedAt': { $exists: false } },
            { 'aiDocument.emailedAt': null },
        ],
    })
        .sort({ 'aiDocument.releasedAt': 1 })
        .limit(limit)
        .lean();

    let emailedCount = 0;
    let failedCount = 0;

    for (const order of orders) {
        try {
            const sent = await sendAIDocumentReadyEmail(order._id.toString());
            if (sent) {
                emailedCount += 1;
            }
        } catch (error) {
            await Order.findByIdAndUpdate(order._id, {
                $set: {
                    'aiDocument.emailError': formatErrorMessage(error),
                },
            });
            failedCount += 1;
        }
    }

    return { emailedCount, failedCount };
}

export async function cleanupFailedOrderArtifacts(orderId: string) {
    await cleanupOrderArtifacts(orderId);
}

export function createPreparedOrderId() {
    return new Types.ObjectId().toString();
}

export async function sendAIDocumentReadyEmailForOrder(orderId: string) {
    await connectMongo();
    return sendAIDocumentReadyEmail(orderId);
}
