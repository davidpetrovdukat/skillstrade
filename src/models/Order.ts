import mongoose, { Schema, Document, Model } from 'mongoose';

export enum OrderStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export enum AIDocumentStatus {
    REQUESTED = 'REQUESTED',
    GENERATING = 'GENERATING',
    GENERATED = 'GENERATED',
    RELEASING = 'RELEASING',
    RELEASED = 'RELEASED',
    FAILED = 'FAILED'
}

export interface IOrderSelectedAddonSnapshot {
    title: string;
    description: string;
    priceTokens: number;
}

export interface IOrderServiceSnapshot {
    title: string;
    category: string;
    overview: string;
    deliverables: string[];
    deliveryDays: number;
    priceTokens: number;
    selectedAddons: IOrderSelectedAddonSnapshot[];
}

export interface IOrderAIDocument {
    status: AIDocumentStatus;
    promptKey?: string;
    model?: string;
    openAIResponseId?: string;
    generatedPdfPath?: string;
    generatedPdfFilename?: string;
    generatedAt?: Date;
    availableAt?: Date;
    releasedAt?: Date;
    emailedAt?: Date;
    error?: string;
    emailError?: string;
}

export interface IOrder extends Document {
    client: mongoose.Types.ObjectId;
    freelancer: mongoose.Types.ObjectId;
    service: mongoose.Types.ObjectId;
    totalTokens: number;
    status: OrderStatus;
    brief?: {
        title: string;
        description: string;
    };
    attachments: string[];
    inputAttachments: string[];
    serviceSnapshot?: IOrderServiceSnapshot;
    aiDocument?: IOrderAIDocument;
    deliveryDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SelectedAddonSnapshotSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        priceTokens: { type: Number, required: true },
    },
    { _id: false }
);

const ServiceSnapshotSchema = new Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        overview: { type: String, required: true },
        deliverables: [{ type: String }],
        deliveryDays: { type: Number, required: true },
        priceTokens: { type: Number, required: true },
        selectedAddons: [SelectedAddonSnapshotSchema],
    },
    { _id: false }
);

const AIDocumentSchema = new Schema(
    {
        status: {
            type: String,
            enum: Object.values(AIDocumentStatus),
            default: AIDocumentStatus.REQUESTED,
        },
        promptKey: { type: String },
        model: { type: String },
        openAIResponseId: { type: String },
        generatedPdfPath: { type: String },
        generatedPdfFilename: { type: String },
        generatedAt: { type: Date },
        availableAt: { type: Date },
        releasedAt: { type: Date },
        emailedAt: { type: Date },
        error: { type: String },
        emailError: { type: String },
    },
    { _id: false }
);

const OrderSchema: Schema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        freelancer: { type: Schema.Types.ObjectId, ref: 'Freelancer', required: true },
        service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        totalTokens: { type: Number, required: true },
        status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
        brief: {
            title: { type: String },
            description: { type: String },
        },
        attachments: [{ type: String }],
        inputAttachments: [{ type: String }],
        serviceSnapshot: { type: ServiceSnapshotSchema },
        aiDocument: { type: AIDocumentSchema },
        deliveryDate: { type: Date },
    },
    {
        timestamps: true,
    }
);

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
