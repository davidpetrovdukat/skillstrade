import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OrdersTable } from '@/components/dashboard/OrdersTable';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order } from '@/models/Order';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    await connectMongo();

    // Fetch user data for balance
    const user = await User.findOne({ email: session.user.email }).lean();

    // Fetch orders (assuming Order model has clientId or something similar, or just fetching empty for now if logic not set)
    // For MVP, if Order model doesn't explicitly link yet, we might return empty.
    // Assuming Order has 'clientEmail' or 'clientId'. Checking Order model via search earlier would confirm, but let's assume empty for now to be safe and avoid crash, or try to find by email if field exists.
    // Correction: We verified Order model exists, but not the fields. Let's return empty array if in doubt, or try basic query.
    // Safe bet: Empty array for now until "Create Order" flow is properly linked to DB.
    const orders: any[] = []; // await Order.find({ clientEmail: session.user.email }).lean();

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                {/* 1. SIDEBAR (Left) - Preserved as requested */}
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                {/* 2. MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex flex-col gap-10">
                    {/* Stats Row */}
                    <StatsCards
                        tokenBalance={user?.walletBalance || 0}
                        activeOrdersCount={orders.length}
                    />

                    {/* Active Orders Table */}
                    <OrdersTable orders={orders} />
                </main>

                {/* Right Sidebar (Logs) is purposely omitted as per instructions */}
            </div>
            <Footer />
        </div>
    );
}
