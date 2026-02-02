
import { connectMongo } from '../src/lib/db';
import { User } from '../src/models/User';
import { Transaction } from '../src/models/Transaction';
import { Order } from '../src/models/Order';
import dotenv from 'dotenv';

dotenv.config();

async function auditBalance() {
    try {
        await connectMongo();
        console.log('--- AUDIT START ---');

        // 1. Find the main user (assuming david... or we list all)
        // Adjust email if known, or list all users with balance > 0
        const users = await User.find({}).lean();

        for (const user of users) {
            console.log(`\nUser: ${user.email} | ID: ${user._id}`);
            console.log(`Current Wallet Balance: ${user.walletBalance}`);

            const transactions = await Transaction.find({ user: user._id }).sort({ createdAt: 1 }).lean();
            console.log(`Transactions (${transactions.length}):`);

            let calculatedBalance = 0;
            transactions.forEach((tx: any) => {
                console.log(` - [${tx.type}] ${tx.amount} T | Desc: ${tx.description} | Date: ${tx.createdAt}`);
                if (tx.type === 'DEPOSIT' || tx.type === 'EARNING') {
                    calculatedBalance += tx.amount;
                } else if (tx.type === 'SPEND' || tx.type === 'WITHDRAWAL' || tx.type === 'PAYMENT') {
                    calculatedBalance -= tx.amount;
                }
            });

            console.log(`Calculated Balance from Transactions: ${calculatedBalance}`);
            console.log(`Discrepancy: ${user.walletBalance - calculatedBalance}`);

            const orders = await Order.find({ client: user._id }).sort({ createdAt: 1 }).lean();
            console.log(`Orders (${orders.length}):`);
            orders.forEach((order: any) => {
                console.log(` - Order ID: ${order._id} | Service: ${order.service} | Total: ${order.totalTokens} | Status: ${order.status}`);
            });
        }

        console.log('--- AUDIT END ---');
        process.exit(0);
    } catch (error) {
        console.error('Audit failed:', error);
        process.exit(1);
    }
}

auditBalance();
