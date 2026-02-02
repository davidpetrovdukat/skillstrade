
import { connectMongo } from '../src/lib/db';
import { User } from '../src/models/User';
import { Transaction } from '../src/models/Transaction';
import { Order, OrderStatus } from '../src/models/Order'; // Ensure OrderStatus is exported or use string
import { Service } from '../src/models/Service';
import { Freelancer } from '../src/models/Freelancer';
import dotenv from 'dotenv';

dotenv.config();

async function fixDashboardData() {
    try {
        await connectMongo();
        console.log('--- DATA FIX START ---');

        // 1. Get Main User
        const user = await User.findOne({ email: 'client@SKILLS-TRADE.com' }); // Adjust if different
        if (!user) throw new Error('User client@SKILLS-TRADE.com not found');

        console.log(`Target User: ${user.email} (${user._id})`);

        // 2. Clear Existing Orders & Transactions for this user (Fresh Start)
        await Order.deleteMany({ client: user._id });
        await Transaction.deleteMany({ user: user._id });
        console.log('Cleared existing orders and transactions.');

        // 3. Re-create "History"
        // A. Deposit 105,000
        await Transaction.create({
            user: user._id,
            amount: 105000,
            type: 'DEPOSIT',
            description: 'Initial Deposit',
            referenceId: 'DEP-INIT-001',
            createdAt: new Date('2026-01-01')
        });

        // B. Spend 13,000 (The "one purchase" mentioned)
        // Need a random service or just a transaction
        await Transaction.create({
            user: user._id,
            amount: 13000,
            type: 'SPEND',
            description: 'Service Purchase (Historical)',
            referenceId: 'ORD-HIST-001',
            createdAt: new Date('2026-01-15')
        });

        // Current theoretical balance: 92,000

        // 4. Create "Completed" Order (Sarah Jenkins - Conversion Copywriting)
        const sarah = await Freelancer.findOne({ name: 'Sarah Jenkins' });
        if (!sarah) throw new Error('Freelancer Sarah Jenkins not found');

        // Find or Create Service
        let serviceCopy = await Service.findOne({ title: 'Conversion Copywriting', freelancer: sarah._id });
        if (!serviceCopy) {
            serviceCopy = await Service.create({
                freelancer: sarah._id,
                title: 'Conversion Copywriting',
                description: 'High converting copy for your landing page.',
                category: 'Writing',
                priceTokens: 8500,
                deliveryDays: 3,

            });
            console.log('Created missing service: Conversion Copywriting');
        }

        const completedOrder = await Order.create({
            client: user._id,
            freelancer: sarah._id,
            service: serviceCopy._id,
            totalTokens: 8500,
            status: 'COMPLETED', // OrderStatus.COMPLETED
            brief: {
                title: 'Homepage Copywriting',
                description: 'Need a punchy homepage copy for my SaaS.'
            },
            attachments: ['/files/homepage_copy_test.pdf'],
            createdAt: new Date('2026-02-01'),
            updatedAt: new Date('2026-02-02')
        });

        // Transaction for Completed Order
        await Transaction.create({
            user: user._id,
            amount: 8500,
            type: 'SPEND',
            description: `Order: ${serviceCopy.title}`,
            referenceId: `ORD-${completedOrder._id}`,
            createdAt: new Date('2026-02-01')
        });

        // 5. Create "Cancelled" Order (Any service)
        // Let's use the same service or another
        const cancelledOrder = await Order.create({
            client: user._id,
            freelancer: sarah._id,
            service: serviceCopy._id,
            totalTokens: 5000,
            status: 'CANCELLED',
            brief: {
                title: 'Blog Post (Cancelled)',
                description: 'Cancelled request.'
            },
            createdAt: new Date('2026-02-02T10:00:00'),
            updatedAt: new Date('2026-02-02T12:00:00')
        });

        // Transactions for Cancelled Order (Spend then Refund)
        await Transaction.create({
            user: user._id,
            amount: 5000,
            type: 'SPEND',
            description: `Order: ${serviceCopy.title}`,
            referenceId: `ORD-${cancelledOrder._id}`,
            createdAt: new Date('2026-02-02T10:00:00')
        });

        await Transaction.create({
            user: user._id,
            amount: 5000,
            type: 'DEPOSIT', // Refund is a deposit technically, or creating a REFUND type would be better but DEPOSIT works for now
            description: `Refund: Order Cancelled`,
            referenceId: `REF-${cancelledOrder._id}`,
            createdAt: new Date('2026-02-02T12:00:00')
        });

        // 6. Update User Balance
        // 92,000 - 8,500 = 83,500
        // Cancelled order net change is 0.
        user.walletBalance = 83500;
        await user.save();

        console.log('--- DATA FIX COMPLETE ---');
        console.log(`New Balance: ${user.walletBalance}`);
        process.exit(0);

    } catch (error) {
        console.error('Fix failed:', error);
        process.exit(1);
    }
}

fixDashboardData();
