import 'server-only';

import { connectMongo } from '@/lib/db';
import { assertValidPdfBuffer, normalizeMongoBuffer } from '@/lib/server/order-file-storage';
import { TransactionFile, TransactionFileKind } from '@/models/TransactionFile';

export async function storeInvoicePdf(input: {
    transactionId: string;
    filename: string;
    buffer: Buffer;
    contentType?: string;
}) {
    assertValidPdfBuffer(input.buffer);

    await connectMongo();

    const storedFile = await TransactionFile.create({
        transaction: input.transactionId,
        kind: TransactionFileKind.INVOICE,
        filename: input.filename,
        contentType: input.contentType || 'application/pdf',
        size: input.buffer.length,
        data: input.buffer,
    });

    return {
        fileId: storedFile._id.toString(),
        filename: storedFile.filename,
        size: storedFile.size,
    };
}

export async function readStoredInvoicePdf(fileId: string) {
    await connectMongo();

    const storedFile = await TransactionFile.findById(fileId)
        .select('transaction filename contentType size data')
        .exec();

    if (!storedFile) {
        throw new Error('Stored invoice file was not found.');
    }

    return {
        fileId: storedFile._id.toString(),
        transactionId: storedFile.transaction.toString(),
        filename: storedFile.filename,
        contentType: storedFile.contentType,
        size: storedFile.size,
        buffer: normalizeMongoBuffer(storedFile.data),
    };
}
