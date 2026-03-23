import mongoose, { Schema, Document, Model } from 'mongoose';

export enum OrderFileKind {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT',
}

export interface IOrderFile extends Document {
    order: mongoose.Types.ObjectId;
    kind: OrderFileKind;
    filename: string;
    contentType: string;
    size: number;
    data: Buffer;
    createdAt: Date;
    updatedAt: Date;
}

const OrderFileSchema: Schema = new Schema(
    {
        order: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
        kind: { type: String, enum: Object.values(OrderFileKind), required: true, index: true },
        filename: { type: String, required: true },
        contentType: { type: String, required: true },
        size: { type: Number, required: true },
        data: { type: Buffer, required: true },
    },
    {
        timestamps: true,
    }
);

export const OrderFile: Model<IOrderFile> = mongoose.models.OrderFile || mongoose.model<IOrderFile>('OrderFile', OrderFileSchema);
