'use server';

import { connectMongo } from '@/lib/db';
import { User, UserRole } from '@/models/User';
import bcrypt from 'bcryptjs';

export interface RegisterState {
    success?: boolean;
    error?: string;
    fieldErrors?: {
        [key: string]: string;
    };
}

export async function registerUser(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    try {
        await connectMongo();

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const phone = formData.get('phone') as string;
        const dobString = formData.get('dob') as string;
        const street = formData.get('street') as string;
        const city = formData.get('city') as string;
        const country = formData.get('country') as string;
        const postcode = formData.get('postcode') as string;

        // 1. Basic Validation
        if (!email || !password || !firstName || !lastName) {
            return { error: 'Please fill in all required fields.' };
        }

        if (password !== confirmPassword) {
            return { error: 'Passwords do not match.' };
        }

        if (password.length < 6) {
            return { error: 'Password must be at least 6 characters long.' };
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'Email is already registered.' };
        }

        // 3. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create User
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dob: dobString ? new Date(dobString) : undefined,
            phone,
            address: {
                street,
                city,
                country,
                postcode
            },
            role: UserRole.CLIENT, // Default role
            walletBalance: 0
        });

        return { success: true };

    } catch (error: any) {
        console.error('Registration Error:', error);
        return { error: 'Something went wrong. Please try again.' };
    }
}
