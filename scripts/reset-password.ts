
import { connectMongo } from '../src/lib/db';
import { User } from '../src/models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function resetPassword() {
    try {
        await connectMongo();
        const email = 'nikitajermolajevs1@outlook.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (user) {
            console.log(`Password for ${email} reset to: ${password}`);
        } else {
            console.log(`User ${email} not found.`);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetPassword();
