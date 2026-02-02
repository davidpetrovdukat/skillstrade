
import { connectMongo } from '../src/lib/db';
import { User } from '../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

async function listUsers() {
    try {
        await connectMongo();
        console.log('--- USER LIST ---');
        const users = await User.find({}).select('email firstName lastName walletBalance createdAt').lean();

        if (users.length === 0) {
            console.log('No users found.');
        } else {
            users.forEach(u => {
                console.log(`Email: ${u.email} | Name: ${u.firstName} ${u.lastName} | Balance: ${u.walletBalance} | Created: ${u.createdAt}`);
            });
        }
        console.log('-----------------');
        process.exit(0);
    } catch (error) {
        console.error('Error listing users:', error);
        process.exit(1);
    }
}

listUsers();
