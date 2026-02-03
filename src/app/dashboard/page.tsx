import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Order } from '@/models/Order';
import { Transaction } from '@/models/Transaction';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect('/login');
    }

    await connectMongo();

    // Fetch user data
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) redirect('/login');

    const userId = (user as any)._id;

    // 1. Stats: Active Orders Count (IN_PROGRESS)
    const activeOrdersCount = await Order.countDocuments({
        client: userId,
        status: 'IN_PROGRESS'
    });

    // 2. Stats: Total Spent
    const spendTxs = await Transaction.find({
        user: userId,
        type: 'SPEND'
    }).lean();
    const totalSpentTokens = spendTxs.reduce((sum, tx) => sum + tx.amount, 0);

    // 3. Recent Activity (Transactions)
    const transactions = await Transaction.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                {/* 1. SIDEBAR (Left) */}
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                {/* 2. MAIN CONTENT */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex flex-col gap-10">
                    {/* Stats Row */}
                    <StatsCards
                        tokenBalance={user.walletBalance || 0}
                        activeOrdersCount={activeOrdersCount}
                        totalSpentTokens={totalSpentTokens}
                    />

                    {/* Recent Activity Table */}
                    <RecentActivity
                        transactions={JSON.parse(JSON.stringify(transactions))}
                    />
                </main>
            </div>
            <Footer />
        </div>
    );
}

