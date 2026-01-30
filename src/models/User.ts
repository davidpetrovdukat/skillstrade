
import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
    CLIENT = 'CLIENT',
    FREELANCER = 'FREELANCER',
    ADMIN = 'ADMIN'
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Hashed. Optional because seeded users might not have one yet.
    dob?: Date; // Date of Birth
    role: UserRole;
    phone?: string;
    address?: {
        street: string;
        city: string;
        country: string;
        postcode: string;
    };
    walletBalance: number; // In Tokens
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Not required for ALL users yet (e.g. seeds), but will be for signup
    dob: { type: Date },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CLIENT },
    phone: { type: String },
    address: {
        street: String,
        city: String,
        country: String,
        postcode: String
    },
    walletBalance: { type: Number, default: 0 },
}, {
    timestamps: true,
});

// Prevent recompilation error in development
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
