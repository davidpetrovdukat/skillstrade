import { Plus, Clock, CreditCard } from 'lucide-react';
import { MOCK_STATS } from '@/lib/dashboard-data';

export function StatsCards() {
    const { tokenBalance, activeOrders, totalSpent } = MOCK_STATS;

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Token Balance */}
                <div className="group relative bg-[#121212] border border-white/10 p-6 flex flex-col justify-between min-h-[140px] hover:border-primary/50 transition-colors duration-300">
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Token Balance</p>
                        <button className="size-8 flex items-center justify-center bg-primary text-black hover:bg-white transition-colors">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white tracking-tighter">
                            {tokenBalance.toLocaleString()} <span className="text-primary">T</span>
                        </p>
                    </div>
                </div>

                {/* Card 2: Active Orders */}
                <div className="group bg-[#121212] border border-white/10 p-6 flex flex-col justify-between min-h-[140px] hover:border-white/30 transition-colors">
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Active Orders</p>
                        <Clock className="text-gray-600 w-6 h-6 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white tracking-tighter">{activeOrders}</p>
                    </div>
                </div>

                {/* Card 3: Total Spent */}
                <div className="group bg-[#121212] border border-white/10 p-6 flex flex-col justify-between min-h-[140px] hover:border-white/30 transition-colors">
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Spent</p>
                        <CreditCard className="text-gray-600 w-6 h-6 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white tracking-tighter">€{totalSpent.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
