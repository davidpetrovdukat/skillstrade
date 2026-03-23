import 'server-only';

import { connectMongo } from '@/lib/db';
import { parseMongoFileReference } from '@/lib/order-file-storage';
import { OrderFile } from '@/models/OrderFile';

export function normalizeMongoBuffer(value: unknown): Buffer {
    if (Buffer.isBuffer(value)) {
        return value;
    }

    if (value instanceof Uint8Array) {
        return Buffer.from(value);
    }

    if (value instanceof ArrayBuffer) {
        return Buffer.from(value);
    }

    if (value && typeof value === 'object') {
        const record = value as {
            type?: string;
            data?: unknown;
            buffer?: unknown;
            byteOffset?: unknown;
            byteLength?: unknown;
            value?: (() => unknown) | unknown;
        };

        if (Array.isArray(record.data)) {
            return Buffer.from(record.data);
        }

        if (record.type === 'Buffer' && Array.isArray(record.data)) {
            return Buffer.from(record.data);
        }

        if (record.buffer instanceof ArrayBuffer) {
            const byteOffset = typeof record.byteOffset === 'number' ? record.byteOffset : 0;
            const byteLength = typeof record.byteLength === 'number'
                ? record.byteLength
                : undefined;

            return Buffer.from(record.buffer, byteOffset, byteLength);
        }

        if (typeof record.value === 'function') {
            const nextValue = record.value();
            if (nextValue !== value) {
                return normalizeMongoBuffer(nextValue);
            }
        }
    }

    throw new Error('Stored file bytes could not be normalized.');
}

export async function readMongoStoredOrderFile(fileId: string) {
    await connectMongo();

    const storedFile = await OrderFile.findById(fileId)
        .select('order filename contentType size data')
        .exec();

    if (!storedFile) {
        throw new Error('Stored file was not found.');
    }

    return {
        fileId: storedFile._id.toString(),
        orderId: storedFile.order.toString(),
        filename: storedFile.filename,
        contentType: storedFile.contentType,
        size: storedFile.size,
        buffer: normalizeMongoBuffer(storedFile.data),
    };
}

export async function readMongoStoredOrderFileFromReference(storedPath: string) {
    const mongoFile = parseMongoFileReference(storedPath);
    if (!mongoFile) {
        return null;
    }

    return readMongoStoredOrderFile(mongoFile.fileId);
}

export function assertValidPdfBuffer(buffer: Buffer) {
    if (buffer.length <= 0) {
        throw new Error('Generated PDF is empty.');
    }

    if (buffer.subarray(0, 5).toString('utf8') !== '%PDF-') {
        throw new Error('Generated PDF is invalid.');
    }
}
