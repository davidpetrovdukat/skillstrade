
import mongoose, { Schema, Document, Model } from 'mongoose';

export enum TxType {
    DEPOSIT = 'DEPOSIT',
    SPEND = 'SPEND',
    EARNING = 'EARNING',
    WITHDRAWAL = 'WITHDRAWAL'
}

export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    amount: number;
    type: TxType;
    description: string;
    referenceId?: string;
    createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(TxType), required: true },
    description: { type: String, required: true },
    referenceId: { type: String },
}, {
    timestamps: true,
});

export const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
