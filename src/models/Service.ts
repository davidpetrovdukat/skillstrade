
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceAddon {
    title: string;
    description: string;
    priceTokens: number;
    isStandalone: boolean;
}

export interface IReview {
    authorName: string;
    text: string;
    rating: number;
    createdAt: Date;
}

export interface IService extends Document {
    title: string;
    priceTokens: number;
    displayPrice?: string;
    deliveryDays: number;
    category: string;
    tags: string[];
    overview: string;
    deliverables: string[];
    imageUrl?: string;
    freelancer: mongoose.Types.ObjectId; // Reference
    addons: IServiceAddon[];
    reviews: IReview[];
    createdAt: Date;
    updatedAt: Date;
}

const ServiceAddonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceTokens: { type: Number, required: true },
    isStandalone: { type: Boolean, default: false }
});

const ReviewSchema = new Schema({
    authorName: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    priceTokens: { type: Number, required: true },
    displayPrice: { type: String },
    deliveryDays: { type: Number, default: 5 },
    category: { type: String, required: true },
    tags: [{ type: String }],
    overview: { type: String, required: true },
    deliverables: [{ type: String }],
    imageUrl: { type: String },
    freelancer: { type: Schema.Types.ObjectId, ref: 'Freelancer', required: true },
    addons: [ServiceAddonSchema],
    reviews: [ReviewSchema],
}, {
    timestamps: true,
});

export const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
