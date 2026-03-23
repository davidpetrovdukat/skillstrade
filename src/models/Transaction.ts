
import mongoose, { Schema, Document, Model } from 'mongoose';

export enum TxType {
    DEPOSIT = 'DEPOSIT',
    SPEND = 'SPEND',
    EARNING = 'EARNING',
    WITHDRAWAL = 'WITHDRAWAL'
}

export enum TxStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export enum TxPaymentMethod {
    PAYDECA = 'PAYDECA',
    BYPASS = 'BYPASS',
}

export interface TransactionBillingSnapshot {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    dateOfBirth: string;
}

export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    type: TxType;
    status: TxStatus;
    description: string;
    referenceId?: string;
    paydecaRef?: string;
    amountPaid?: number;
    currency?: string;
    vatRate?: number;
    paymentMethod?: TxPaymentMethod;
    billingSnapshot?: TransactionBillingSnapshot;
    invoiceNumber?: string;
    invoiceFileId?: string;
    invoiceFilename?: string;
    invoiceSentAt?: Date;
    completedAt?: Date;
    createdAt: Date;
}

const TransactionSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: Object.values(TxType), required: true },
        status: { type: String, enum: Object.values(TxStatus), default: TxStatus.COMPLETED },
        description: { type: String, required: true },
        referenceId: { type: String },
        paydecaRef: { type: String },
        amountPaid: { type: Number },
        currency: { type: String },
        vatRate: { type: Number },
        paymentMethod: { type: String, enum: Object.values(TxPaymentMethod) },
        billingSnapshot: {
            firstName: { type: String },
            lastName: { type: String },
            email: { type: String },
            phone: { type: String },
            country: { type: String },
            street: { type: String },
            city: { type: String },
            zip: { type: String },
            dateOfBirth: { type: String },
        },
        invoiceNumber: { type: String },
        invoiceFileId: { type: String },
        invoiceFilename: { type: String },
        invoiceSentAt: { type: Date },
        completedAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

export const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
