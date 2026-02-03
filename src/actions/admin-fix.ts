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
        // 2. Clear existing data
        await Transaction.deleteMany({ user: user._id });
        await Order.deleteMany({ client: user._id });

        // -- PREPARE ENTITIES --
        // 1. Sarah Jenkins (Copywriting)
        let sarah = await Freelancer.findOne({ 'name.last': 'Jenkins' });
        if (!sarah) sarah = await Freelancer.findOne({});

        // 2. Nigel Rivers (Marketing)
        let nigel = await Freelancer.findOne({ 'name.last': 'Rivers' });
        if (!nigel) nigel = await Freelancer.findOne({}); // Fallback

        // 3. Arthur Sterling (Brand)
        let arthur = await Freelancer.findOne({ 'name.last': 'Sterling' });
        if (!arthur) arthur = await Freelancer.findOne({}); // Fallback

        // Services
        // A. Conversion Copywriting (Sarah)
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

        // B. Strategic Brand Identity (Arthur) -> For "Web Development Project" update
        let serviceBrand = await Service.findOne({ title: 'Strategic Brand Identity' });
        if (!serviceBrand && arthur) {
            serviceBrand = await Service.create({
                freelancer: arthur._id,
                title: 'Strategic Brand Identity',
                overview: 'Complete brand overhaul.',
                category: 'Design',
                priceTokens: 13000,
                deliveryDays: 14,
                tags: ['branding'],
                deliverables: ['Brand Guidelines'],
                reviews: []
            });
        }

        // C. Email Marketing & CRM (Nigel) -> For "Blog Post" update
        let serviceEmail = await Service.findOne({ title: 'Email Marketing & CRM' });
        if (!serviceEmail && nigel) {
            serviceEmail = await Service.create({
                freelancer: nigel._id,
                title: 'Email Marketing & CRM',
                overview: 'Automated email flows.',
                category: 'Marketing',
                priceTokens: 5000,
                deliveryDays: 5,
                tags: ['email', 'crm'],
                deliverables: ['3 Email Flows'],
                reviews: []
            });
        }
        // ----------------------------------------

        // 3. Re-create History
        // A. Deposit 105,000
        await Transaction.create({
            user: user._id,
            amount: 105000,
            type: 'DEPOSIT',
            description: 'Top-up',
            createdAt: new Date('2026-01-15'),
        });

        // B. Spend 13,000 - "Strategic Brand Identity" (In Progress)
        // Formerly "Web Development Project"
        const progressOrder = await Order.create({
            client: user._id,
            freelancer: sarah?._id || user._id,
            service: serviceBrand?._id || user._id,
            totalTokens: 13000,
            status: 'IN_PROGRESS',
            brief: {
                title: 'Strategic Brand Identity',
                description: 'Initial phase payment.'
            },
            createdAt: new Date('2026-01-20'),
        }) as any;

        await Transaction.create({
            user: user._id,
            amount: 13000,
            type: 'SPEND',
            description: `Order #${progressOrder._id.toString().slice(-6)}`,
            createdAt: new Date('2026-01-20'),
        });

        // 4. Create "Completed" Order (Sarah Jenkins - Conversion Copywriting)
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
                attachments: ['/files/homepage_copy_test.pdf'],
                createdAt: new Date('2026-02-01'),
            }) as any;

            await Transaction.create({
                user: user._id,
                amount: 8500,
                type: 'SPEND',
                description: `Order #${completedOrder._id.toString().slice(-6)}`,
                createdAt: new Date('2026-02-01'),
            });
        }

        // 5. Create "Cancelled" Order - "Email Marketing & CRM" (Nigel Rivers)
        // Formerly "Blog Post"
        const cancelledOrder = await Order.create({
            client: user._id,
            freelancer: nigel?._id || user._id,
            service: serviceEmail?._id || user._id,
            totalTokens: 5000,
            status: 'CANCELLED',
            brief: {
                title: 'Email Marketing & CRM',
                description: 'Order cancelled by client.'
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
