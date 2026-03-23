import 'server-only';

import { revalidatePath } from 'next/cache';
import { TOKEN_EXCHANGE_RATE } from '@/lib/constants';
import { sendInvoiceEmail } from '@/lib/customer-email';
import { connectMongo } from '@/lib/db';
import { renderInvoicePdf } from '@/lib/invoice-pdf';
import { assertValidPdfBuffer } from '@/lib/server/order-file-storage';
import { readStoredInvoicePdf, storeInvoicePdf } from '@/lib/server/transaction-file-storage';
import {
    Transaction,
    TxPaymentMethod,
    TxStatus,
    TxType,
    type ITransaction,
    type TransactionBillingSnapshot,
} from '@/models/Transaction';
import { User, type IUser } from '@/models/User';

export interface PurchaseBillingInfo {
    phone: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    dateOfBirth: string;
    ip?: string;
}

const DEFAULT_VAT_RATE = 0.2;
const DEFAULT_CURRENCY = 'EUR';

function getPaymentMethodLabel(method?: TxPaymentMethod) {
    if (method === TxPaymentMethod.BYPASS) {
        return 'Bypass test mode';
    }

    return 'Paydeca';
}

function formatInvoiceNumber(transaction: ITransaction) {
    if (transaction.invoiceNumber) {
        return transaction.invoiceNumber;
    }

    const datePart = new Date(transaction.createdAt).toISOString().slice(0, 10).replace(/-/g, '');
    const referenceSource = transaction.referenceId || transaction._id.toString().slice(-6).toUpperCase();
    return `INV-${datePart}-${referenceSource.replace(/[^A-Z0-9-]/gi, '').slice(-12).toUpperCase()}`;
}

function buildBillingSnapshot(user: IUser, billing?: TransactionBillingSnapshot | null): TransactionBillingSnapshot {
    return {
        firstName: billing?.firstName || user.firstName,
        lastName: billing?.lastName || user.lastName,
        email: billing?.email || user.email,
        phone: billing?.phone || user.phone || '',
        country: billing?.country || user.address?.country || '',
        street: billing?.street || user.address?.street || '',
        city: billing?.city || user.address?.city || '',
        zip: billing?.zip || user.address?.postcode || '',
        dateOfBirth: billing?.dateOfBirth || (user.dob ? user.dob.toISOString().slice(0, 10) : ''),
    };
}

function buildBillingAddress(snapshot: TransactionBillingSnapshot) {
    return [snapshot.street, [snapshot.city, snapshot.zip].filter(Boolean).join(', '), snapshot.country]
        .map((line) => line.trim())
        .filter(Boolean);
}

function buildInvoiceMath(transaction: ITransaction) {
    const vatRate = transaction.vatRate ?? DEFAULT_VAT_RATE;
    const total = transaction.amountPaid ?? Number((transaction.amount * TOKEN_EXCHANGE_RATE).toFixed(2));

    if (vatRate <= 0) {
        return {
            subtotal: total,
            vatAmount: 0,
            total,
        };
    }

    const subtotal = Number((total / (1 + vatRate)).toFixed(2));
    const vatAmount = Number((total - subtotal).toFixed(2));

    return {
        subtotal,
        vatAmount,
        total,
    };
}

async function ensureInvoiceArtifact(transaction: ITransaction, user: IUser) {
    const invoiceNumber = formatInvoiceNumber(transaction);
    const billingSnapshot = buildBillingSnapshot(user, transaction.billingSnapshot || null);
    const invoiceMath = buildInvoiceMath(transaction);
    const pdfFilename =
        transaction.invoiceFilename ||
        `skills-trade-invoice-${invoiceNumber.toLowerCase()}.pdf`;

    if (transaction.invoiceFileId) {
        const storedFile = await readStoredInvoicePdf(transaction.invoiceFileId);

        return {
            invoiceNumber,
            pdfFilename: transaction.invoiceFilename || storedFile.filename,
            pdfBuffer: storedFile.buffer,
            billingSnapshot,
            invoiceMath,
        };
    }

    const pdfBuffer = await renderInvoicePdf({
        invoiceNumber,
        invoiceDate: transaction.completedAt || transaction.createdAt,
        transactionReference: transaction.referenceId || transaction._id.toString(),
        paymentMethodLabel: getPaymentMethodLabel(transaction.paymentMethod),
        customerName: `${billingSnapshot.firstName} ${billingSnapshot.lastName}`.trim(),
        customerEmail: billingSnapshot.email,
        billingAddress: buildBillingAddress(billingSnapshot),
        description: transaction.description,
        tokens: transaction.amount,
        subtotal: invoiceMath.subtotal,
        vatAmount: invoiceMath.vatAmount,
        total: invoiceMath.total,
        currency: transaction.currency || DEFAULT_CURRENCY,
    });

    assertValidPdfBuffer(pdfBuffer);

    const storedFile = await storeInvoicePdf({
        transactionId: transaction._id.toString(),
        filename: pdfFilename,
        buffer: pdfBuffer,
    });

    await Transaction.updateOne(
        { _id: transaction._id },
        {
            $set: {
                invoiceNumber,
                invoiceFileId: storedFile.fileId,
                invoiceFilename: storedFile.filename,
                billingSnapshot,
            },
        }
    );

    return {
        invoiceNumber,
        pdfFilename: storedFile.filename,
        pdfBuffer,
        billingSnapshot,
        invoiceMath,
    };
}

export async function completeDepositTransaction(transactionId: string) {
    await connectMongo();

    const transaction = await Transaction.findById(transactionId).exec();
    if (!transaction) {
        throw new Error('Transaction not found');
    }

    if (transaction.type !== TxType.DEPOSIT) {
        throw new Error('Only deposit transactions can be completed with an invoice.');
    }

    const user = await User.findById(transaction.user).exec();
    if (!user) {
        throw new Error('User not found');
    }

    const completionResult = await Transaction.updateOne(
        { _id: transaction._id, status: { $ne: TxStatus.COMPLETED } },
        {
            $set: {
                status: TxStatus.COMPLETED,
                completedAt: new Date(),
            },
        }
    );

    if (completionResult.modifiedCount > 0) {
        await User.updateOne({ _id: user._id }, { $inc: { walletBalance: transaction.amount } });
        user.walletBalance = (user.walletBalance || 0) + transaction.amount;
    }

    const refreshedTransaction = await Transaction.findById(transaction._id).exec();
    if (!refreshedTransaction) {
        throw new Error('Transaction not found after completion update');
    }

    const invoice = await ensureInvoiceArtifact(refreshedTransaction, user);

    let invoiceEmailSent = false;
    let invoiceEmailSkipped = false;

    if (!refreshedTransaction.invoiceSentAt) {
        try {
            const emailResult = await sendInvoiceEmail({
                to: user.email,
                firstName: user.firstName,
                invoiceNumber: invoice.invoiceNumber,
                description: refreshedTransaction.description,
                total: invoice.invoiceMath.total,
                currency: refreshedTransaction.currency || DEFAULT_CURRENCY,
                pdfFilename: invoice.pdfFilename,
                pdfBuffer: invoice.pdfBuffer,
            });

            invoiceEmailSkipped = Boolean(emailResult.skipped);

            if (emailResult.sent) {
                invoiceEmailSent = true;
                await Transaction.updateOne(
                    { _id: refreshedTransaction._id },
                    { $set: { invoiceSentAt: new Date() } }
                );
            }
        } catch (error) {
            console.error('Invoice email failed:', error);
        }
    } else {
        invoiceEmailSent = true;
    }

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/wallet');

    return {
        transactionId: refreshedTransaction._id.toString(),
        walletCredited: completionResult.modifiedCount > 0,
        invoiceNumber: invoice.invoiceNumber,
        invoiceFilename: invoice.pdfFilename,
        invoiceEmailSent,
        invoiceEmailSkipped,
    };
}
