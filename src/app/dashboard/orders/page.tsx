import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { OrderHistoryTable } from '@/components/dashboard/OrderHistoryTable';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order, OrderStatus } from '@/models/Order';
import { Freelancer } from '@/models/Freelancer';
import { Service } from '@/models/Service';
import { Freelancer } from '@/models/Freelancer';
import { Service } from '@/models/Service';

// Force dynamic rendering since we fetch user-specific data
export const dynamic = 'force-dynamic';

export default async function MyOrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    await connectMongo();

    // 1. Get Client User ID
    const user = await User.findOne({ email: session.user.email });
    if (!user) redirect('/login');

    // 2. Fetch Orders (Client -> Order)
    // Note: ensure we populate freelancer and service for the table
    // 4. Auto-Seed Test Order if Empty
    const orderCount = await Order.countDocuments({ client: user._id });

    if (orderCount === 0) {
        // Find Sarah Jenkins
        const sarah = await Freelancer.findOne({ name: 'Sarah Jenkins' });

        if (sarah) {
            // Find a service by Sarah or create a mock one if needed, but let's try to find one first
            // or just use any service for the sake of the test order
            // Ideally we find a service belonging to Sarah
            let service = await Service.findOne({ freelancer: sarah._id });

            // If Sarah has no service, find ANY service just to link it (fallback)
            if (!service) {
                service = await Service.findOne({});
            }

            if (service) {
                await Order.create({
                    client: user._id,
                    freelancer: sarah._id,
                    service: service._id,
                    totalTokens: 500,
                    status: OrderStatus.COMPLETED,
                    brief: {
                        title: 'Homepage Copywriting',
                        description: 'Need a punchy homepage copy for my SaaS.',
                    },
                    attachments: ['/file/homepage_copy_test.pdf'],
                    createdAt: new Date('2026-01-30'), // Backdate slightly
                    updatedAt: new Date()
                });
            }
        }
    }

    // 5. Fetch All Orders (now including the seeded one if applicable)
    const orders = await Order.find({ client: user._id })
        .populate({
            path: 'freelancer',
            model: Freelancer, // Ensure model is loaded
            select: 'name avatarUrl' // Select only needed fields
        })
        .populate({
            path: 'service',
            model: Service, // Ensure model is loaded
            select: 'title'
        })
        .sort({ createdAt: -1 }) // Newest first
        .lean();

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e]">
                    <OrderHistoryTable orders={JSON.parse(JSON.stringify(orders))} />
                </main>
            </div>
            <Footer />
        </div>
    );
}
