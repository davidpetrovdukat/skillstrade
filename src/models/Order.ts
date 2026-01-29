
import mongoose, { Schema, Document, Model } from 'mongoose';

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface IOrder extends Document {
    client: mongoose.Types.ObjectId;
    freelancer: mongoose.Types.ObjectId;
    service: mongoose.Types.ObjectId;
    totalTokens: number;
    status: OrderStatus;
    brief?: string;
    attachments: string[];
    deliveryDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    freelancer: { type: Schema.Types.ObjectId, ref: 'Freelancer', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    totalTokens: { type: Number, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    brief: { type: String },
    attachments: [{ type: String }],
    deliveryDate: { type: Date },
}, {
    timestamps: true,
});

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
