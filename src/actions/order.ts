'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order, OrderStatus } from '@/models/Order';
import { Transaction } from '@/models/Transaction';
import { Service } from '@/models/Service';
import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';
import type { Types } from 'mongoose';
import { getNotificationEmail, getResendFromEmail } from '@/lib/email';
import {
    buildOrderServiceSnapshot,
    cleanupFailedOrderArtifacts,
    createPreparedOrderId,
    generateImmediateAIDocument,
    isAIDocumentTestMode,
    saveOrderInputAttachments,
    sendAIDocumentReadyEmailForOrder,
    submitBackgroundAIDocumentRequest,
} from '@/lib/ai-order';

const resend = new Resend(process.env.RESEND_API_KEY);
const ORDER_NOTIFICATION_EMAIL = getNotificationEmail('ORDER_NOTIFICATION_TO');
const RESEND_FROM = getResendFromEmail();

interface ServiceAddonSelection {
    _id: Types.ObjectId;
    title: string;
    description: string;
    priceTokens: number;
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }

    return 'Failed to create order';
}

function extractFiles(formData: FormData) {
    const filesFromArray = formData.getAll('files');
    const legacyFile = formData.get('file');
    const candidates = [...filesFromArray, legacyFile].filter(Boolean);

    return candidates.filter((value): value is File => value instanceof File && value.size > 0);
}

export async function createOrder(formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return { success: false, error: 'Unauthorized' };
    }

    let createdOrderId: string | null = null;
    let userId: string | null = null;
    let totalTokensToRollback = 0;
    let transactionId: string | null = null;
    let orderPersisted = false;

    try {
        await connectMongo();

        const serviceId = formData.get('serviceId') as string;
        const requirements = (formData.get('requirements') as string)?.trim();
        const totalTokens = parseInt(formData.get('totalTokens') as string, 10);
        const addonIds = formData.getAll('addons') as string[];
        const files = extractFiles(formData);

        if (!serviceId || !requirements || Number.isNaN(totalTokens)) {
            return { success: false, error: 'Invalid order data' };
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        userId = user._id.toString();

        const service = await Service.findById(serviceId);
        if (!service) {
            return { success: false, error: 'Service not found' };
        }

        let calculatedPrice = service.priceTokens;
        let selectedAddons: ServiceAddonSelection[] = [];

        if (addonIds.length > 0 && service.addons) {
            const serviceAddons = service.addons as unknown as ServiceAddonSelection[];
            selectedAddons = serviceAddons.filter((addon) => addonIds.includes(addon._id.toString()));
            const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.priceTokens, 0);
            calculatedPrice += addonsPrice;
        }

        if (totalTokens !== calculatedPrice) {
            console.error(`Price Mismatch: Expected ${calculatedPrice}, Got ${totalTokens}`);
            return { success: false, error: 'Price mismatch. Please try again.' };
        }

        if ((user.walletBalance || 0) < totalTokens) {
            return { success: false, error: 'Insufficient balance' };
        }

        const orderId = createPreparedOrderId();
        createdOrderId = orderId;
        const inputAttachments = await saveOrderInputAttachments(orderId, files);

        const serviceSnapshot = buildOrderServiceSnapshot({
            service: {
                title: service.title,
                category: service.category,
                overview: service.overview,
                deliverables: service.deliverables || [],
                deliveryDays: service.deliveryDays,
                priceTokens: service.priceTokens,
            },
            selectedAddons: selectedAddons.map((addon) => ({
                title: addon.title,
                description: addon.description,
                priceTokens: addon.priceTokens,
            })),
        });

        let status = OrderStatus.IN_PROGRESS;
        let attachments: string[] = [];
        let deliveryDate: Date | undefined;
        let aiDocument:
            | {
                status: string;
                promptKey: string;
                model: string;
                openAIResponseId: string;
                generatedPdfPath?: string;
                generatedPdfFilename?: string;
                generatedAt?: Date;
                availableAt?: Date;
                releasedAt?: Date;
            }
            | undefined;

        if (isAIDocumentTestMode()) {
            const immediateResult = await generateImmediateAIDocument({
                orderId,
                serviceSnapshot,
                projectBrief: requirements,
                inputAttachments,
            });

            status = OrderStatus.COMPLETED;
            attachments = [immediateResult.pdf.publicPath];
            deliveryDate = immediateResult.generatedAt;
            aiDocument = {
                status: 'RELEASED',
                promptKey: immediateResult.promptKey,
                model: immediateResult.model,
                openAIResponseId: immediateResult.responseId,
                generatedPdfPath: immediateResult.pdf.publicPath,
                generatedPdfFilename: immediateResult.pdf.filename,
                generatedAt: immediateResult.generatedAt,
                availableAt: immediateResult.generatedAt,
                releasedAt: immediateResult.generatedAt,
            };
        } else {
            const backgroundRequest = await submitBackgroundAIDocumentRequest({
                serviceSnapshot,
                projectBrief: requirements,
                inputAttachments,
            });

            aiDocument = {
                status: 'REQUESTED',
                promptKey: backgroundRequest.promptKey,
                model: backgroundRequest.model,
                openAIResponseId: backgroundRequest.responseId,
            };
        }

        user.walletBalance -= totalTokens;
        totalTokensToRollback = totalTokens;
        await user.save();

        const transaction = await Transaction.create({
            user: user._id,
            amount: totalTokens,
            type: 'SPEND',
            description: `Order: ${service.title}`,
            referenceId: `ORD-${Date.now()}`,
        });
        transactionId = transaction._id.toString();

        const order = await Order.create({
            _id: orderId,
            client: user._id,
            freelancer: service.freelancer,
            service: service._id,
            totalTokens,
            status,
            brief: {
                title: service.title,
                description: requirements,
            },
            attachments,
            inputAttachments,
            serviceSnapshot,
            aiDocument,
            deliveryDate,
        });
        orderPersisted = true;

        if (process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: RESEND_FROM,
                    to: [ORDER_NOTIFICATION_EMAIL],
                    subject: `New Order: ${service.title} (${totalTokens} T)`,
                    html: `
                        <h1>New Order Received</h1>
                        <p><strong>Client:</strong> ${user.firstName} ${user.lastName} (${user.email})</p>
                        <p><strong>Service:</strong> ${service.title}</p>
                        <p><strong>Tokens:</strong> ${totalTokens}</p>
                        <p><strong>Requirements:</strong> ${requirements}</p>
                        ${selectedAddons.length > 0 ? `<p><strong>Add-ons:</strong> ${selectedAddons.map((addon) => addon.title).join(', ')}</p>` : ''}
                        <p><strong>Order ID:</strong> ${order._id}</p>
                    `,
                });
            } catch (emailError) {
                console.error('Admin order notification failed:', emailError);
            }
        }

        if (isAIDocumentTestMode()) {
            try {
                await sendAIDocumentReadyEmailForOrder(order._id.toString());
            } catch (emailError) {
                console.error('Immediate order-ready email failed:', emailError);
            }
        }

        revalidatePath('/dashboard');
        revalidatePath('/dashboard/orders');

        return { success: true, orderId: order._id.toString() };
    } catch (error: unknown) {
        console.error('Order creation failed:', error);

        if (!orderPersisted && createdOrderId) {
            await cleanupFailedOrderArtifacts(createdOrderId);
        }

        if (!orderPersisted && userId && totalTokensToRollback > 0) {
            try {
                await User.findByIdAndUpdate(userId, {
                    $inc: { walletBalance: totalTokensToRollback },
                });
            } catch (rollbackError) {
                console.error('Order rollback failed:', rollbackError);
            }
        }

        if (!orderPersisted && transactionId) {
            try {
                await Transaction.findByIdAndDelete(transactionId);
            } catch (rollbackError) {
                console.error('Transaction rollback failed:', rollbackError);
            }
        }

        return { success: false, error: getErrorMessage(error) };
    }
}
