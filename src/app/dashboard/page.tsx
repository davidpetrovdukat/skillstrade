import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OrdersTable } from '@/components/dashboard/OrdersTable';

export default function DashboardPage() {
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
                    <StatsCards />

                    {/* Active Orders Table */}
                    <OrdersTable />
                </main>

                {/* Right Sidebar (Logs) is purposely omitted as per instructions */}
            </div>
            <Footer />
        </div>
    );
}
