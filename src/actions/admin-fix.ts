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

        // 2. Clear existing data
        await Transaction.deleteMany({ user: user._id });
        await Order.deleteMany({ client: user._id });

        // -- FIND FREELANCERS --
        const sarah = await Freelancer.findOne({ name: 'Sarah Jenkins' });
        const nigel = await Freelancer.findOne({ name: 'Nigel Rivers' });
        const arthur = await Freelancer.findOne({ name: 'Arthur Sterling' });

        if (!sarah) console.log('Warning: Sarah Jenkins not found');
        if (!nigel) console.log('Warning: Nigel Rivers not found');
        if (!arthur) console.log('Warning: Arthur Sterling not found');

        // -- CLEAR OLD REVIEWS (Prevent Repetition) --
        const freelancerIds = [sarah?._id, nigel?._id, arthur?._id].filter(Boolean);
        if (freelancerIds.length > 0) {
            await Service.updateMany(
                { freelancer: { $in: freelancerIds } },
                { $set: { reviews: [] } }
            );
            console.log('Cleared old reviews for target freelancers.');
        }

        // -- REPAIR/CREATE SERVICES --
        // A. Conversion Copywriting (Sarah)
        let serviceCopy = null;
        if (sarah) {
            serviceCopy = await Service.findOneAndUpdate(
                { title: 'Conversion Copywriting' },
                {
                    freelancer: sarah._id,
                    title: 'Conversion Copywriting',
                    imageUrl: '/copywriting.webp',
                    overview: 'High converting copy for your landing page and emails.',
                    category: 'Writing',
                    priceTokens: 8500,
                    deliveryDays: 3,
                    tags: ['copywriting', 'sales'],
                    deliverables: ['Landing Page Copy', 'Email Sequence'],
                    addons: [],
                    reviews: [
                        {
                            authorName: "John Doe",
                            text: "Sarah delivered exactly what I needed. The copy is punchy and converts well.",
                            rating: 5,
                            createdAt: new Date('2026-01-10')
                        },
                        {
                            authorName: "Alice M.",
                            text: "Great experience working with Sarah. Professional and fast.",
                            rating: 5,
                            createdAt: new Date('2026-01-15')
                        }
                    ]
                },
                { upsert: true, new: true }
            );
        }

        // B. Strategic Brand Identity (Arthur)
        let serviceBrand = null;
        if (arthur) {
            serviceBrand = await Service.findOneAndUpdate(
                { title: 'Strategic Brand Identity' },
                {
                    freelancer: arthur._id,
                    title: 'Strategic Brand Identity',
                    imageUrl: '/brand_identity.webp',
                    overview: 'Complete brand overhaul including logo, typography, and guidelines.',
                    category: 'Design',
                    priceTokens: 13000,
                    deliveryDays: 14,
                    tags: ['branding', 'design'],
                    deliverables: ['Logo', 'Brand Guidelines', 'Social Assets'],
                    reviews: [
                        {
                            authorName: "Michael Scott",
                            text: "Arthur captured our vision perfectly. The new brand identity is stunning.",
                            rating: 5,
                            createdAt: new Date('2026-01-20')
                        },
                        {
                            authorName: "Pam B.",
                            text: "Highly recommended for any serious business looking to rebrand.",
                            rating: 5,
                            createdAt: new Date('2026-01-22')
                        }
                    ]
                },
                { upsert: true, new: true }
            );
        }

        // C. Email Marketing & CRM (Nigel)
        let serviceEmail = null;
        if (nigel) {
            serviceEmail = await Service.findOneAndUpdate(
                { title: 'Email Marketing & CRM' },
                {
                    freelancer: nigel._id,
                    title: 'Email Marketing & CRM',
                    imageUrl: '/email_crm.webp',
                    overview: 'Automated email flows and CRM setup to boost retention.',
                    category: 'Marketing',
                    priceTokens: 5000,
                    deliveryDays: 5,
                    tags: ['email', 'crm', 'automation'],
                    deliverables: ['3 Email Flows', 'CRM Setup'],
                    reviews: [
                        {
                            authorName: "David Wallace",
                            text: "Nigel's email flows increased our retention by 20%. Amazing work.",
                            rating: 5,
                            createdAt: new Date('2026-01-25')
                        },
                        {
                            authorName: "Jan L.",
                            text: "Very knowledgeable about CRM systems. Smooth setup.",
                            rating: 4,
                            createdAt: new Date('2026-01-28')
                        }
                    ]
                },
                { upsert: true, new: true }
            );
        }


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
        // Freelancer: Arthur Sterling
        if (arthur && serviceBrand) {
            const progressOrder = await Order.create({
                client: user._id,
                freelancer: arthur._id,
                service: serviceBrand._id,
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
        }

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
        if (nigel && serviceEmail) {
            const cancelledOrder = await Order.create({
                client: user._id,
                freelancer: nigel._id,
                service: serviceEmail._id,
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
        }

        // 6. Update Final Balance
        // 105000 - 13000 - 8500 - 5000 + 5000 = 83500
        user.walletBalance = 83500;
        await user.save();

        return { success: true, message: `Data fixed for ${targetEmail}. Services repaired with reviews.` };

    } catch (error: any) {
        console.error('Fix Data Error:', error);
        return { success: false, message: error.message };
    }
}
