
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

export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    type: TxType;
    status: TxStatus;
    description: string;
    referenceId?: string;
    paydecaRef?: string;
    createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(TxType), required: true },
    status: { type: String, enum: Object.values(TxStatus), default: TxStatus.COMPLETED },
    description: { type: String, required: true },
    referenceId: { type: String },
    paydecaRef: { type: String },
}, {
    timestamps: true,
});

export const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
