'use server';

import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Transaction } from '@/models/Transaction';
import { Order } from '@/models/Order';
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';
import bcrypt from 'bcryptjs';

export async function fixDashboardData() {
    try {
        await connectMongo();

        const targetEmail = 'nikitajermolajevs1@outlook.com';
        console.log(`Checking user: ${targetEmail}`);

        let user = await User.findOne({ email: targetEmail });

        // 1. Create User if missing
        if (!user) {
            console.log('User not found. Creating...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = await User.create({
                email: targetEmail,
                firstName: 'Nikita',
                lastName: 'Test',
                password: hashedPassword,
                walletBalance: 0,
            });
        }

        // 2. Clear existing data to avoid duplicates (Fresh Start Logic)
        await Transaction.deleteMany({ user: user._id });
        await Order.deleteMany({ client: user._id });

        // 3. Re-create History
        // A. Deposit 105,000
        await Transaction.create({
            user: user._id,
            amount: 105000,
            type: 'DEPOSIT',
            description: 'Top-up',
            createdAt: new Date('2026-01-15'),
        });

        // B. Spend 13,000
        await Transaction.create({
            user: user._id,
            amount: 13000,
            type: 'SPEND',
            description: 'Service Payment',
            createdAt: new Date('2026-01-20'),
        });

        // 4. Create "Completed" Order (Sarah Jenkins)
        let sarah = await Freelancer.findOne({ 'name.last': 'Jenkins' });
        if (!sarah) {
            // Fallback if Sarah not found (should exist, but safety first)
            sarah = await Freelancer.findOne({});
        }

        // Ensure Service Exists
        let serviceCopy = await Service.findOne({ title: 'Conversion Copywriting' });
        if (!serviceCopy && sarah) {
            serviceCopy = await Service.create({
                freelancer: sarah._id,
                title: 'Conversion Copywriting',
                overview: 'High converting copy',
                category: 'Writing',
                priceTokens: 8500,
                deliveryDays: 3,
                tags: ['copywriting'],
                deliverables: ['Copy'],
                addons: [],
                reviews: []
            });
        }

        if (sarah && serviceCopy) {
            const completedOrder = await Order.create({
                client: user._id,
                freelancer: sarah._id,
                service: serviceCopy._id,
                totalTokens: 8500,
                status: 'COMPLETED',
                brief: {
                    title: 'Conversion Copywriting',
                    description: 'Need copy for landing page.'
                },
                attachments: ['/files/homepage_copy_test.pdf'], // Using the file we added
                createdAt: new Date('2026-02-01'),
            }) as any; // Cast as any to resolve "never" inference issue if strictly typed variables act up in this context, or let it infer if updated correctly.
            // Actually, explicitly typing the variable or just letting it be is fine if property matches.
            // The lint error "_id does not exist on type 'never'" suggests TS thinks create() returns never or void due to mismatch.
            // Fixing the props should resolve the return type.

            await Transaction.create({
                user: user._id,
                amount: 8500,
                type: 'SPEND',
                description: `Order #${completedOrder._id.toString().slice(-6)}`,
                createdAt: new Date('2026-02-01'),
            });
        }

        // 5. Create "Cancelled" Order
        // Just dummy data for the cancelled one
        const cancelledOrder = await Order.create({
            client: user._id,
            // Reuse sarah/service or whatever, doesn't matter much for cancelled
            freelancer: sarah?._id,
            service: serviceCopy?._id,
            totalTokens: 5000,
            status: 'CANCELLED',
            brief: {
                title: 'Blog Post',
                description: 'Blog post (Cancelled)'
            },
            createdAt: new Date('2026-02-02'),
        }) as any;

        await Transaction.create({
            user: user._id,
            amount: 5000,
            type: 'SPEND',
            description: `Order #${cancelledOrder._id.toString().slice(-6)}`,
            createdAt: new Date('2026-02-02T10:00:00'),
        });

        await Transaction.create({
            user: user._id,
            amount: 5000,
            type: 'DEPOSIT', // Refund
            description: `Refund: Order #${cancelledOrder._id.toString().slice(-6)}`,
            createdAt: new Date('2026-02-02T10:05:00'),
        });


        // 6. Update Final Balance
        // 105000 - 13000 - 8500 - 5000 + 5000 = 83500
        user.walletBalance = 83500;
        await user.save();

        return { success: true, message: `Data fixed for ${targetEmail}. Balance: 83,500 T.` };

    } catch (error: any) {
        console.error('Fix Data Error:', error);
        return { success: false, message: error.message };
    }
}
