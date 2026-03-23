import mongoose, { Document, Model, Schema } from 'mongoose';

export enum TransactionFileKind {
    INVOICE = 'INVOICE',
}

export interface ITransactionFile extends Document {
    transaction: mongoose.Types.ObjectId;
    kind: TransactionFileKind;
    filename: string;
    contentType: string;
    size: number;
    data: Buffer;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionFileSchema: Schema = new Schema(
    {
        transaction: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true, index: true },
        kind: { type: String, enum: Object.values(TransactionFileKind), required: true, index: true },
        filename: { type: String, required: true },
        contentType: { type: String, required: true },
        size: { type: Number, required: true },
        data: { type: Buffer, required: true },
    },
    {
        timestamps: true,
    }
);

export const TransactionFile: Model<ITransactionFile> =
    mongoose.models.TransactionFile || mongoose.model<ITransactionFile>('TransactionFile', TransactionFileSchema);
