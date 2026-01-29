
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPortfolioItem {
    title: string;
    category: string;
    imageUrl: string;
}

export interface IFreelancer extends Document {
    user: mongoose.Types.ObjectId; // Reference to User
    slug: string;
    name: string;
    avatarUrl: string;
    location: string;
    flag: string;
    role: string;
    bio: string;
    skills: string[];
    portfolio: IPortfolioItem[];
    isAvailable: boolean;
    verified: boolean;
    rating: number;
    reviewsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const FreelancerSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    location: { type: String, required: true },
    flag: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    skills: [{ type: String }],
    portfolio: [PortfolioSchema],
    isAvailable: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export const Freelancer: Model<IFreelancer> = mongoose.models.Freelancer || mongoose.model<IFreelancer>('Freelancer', FreelancerSchema);
