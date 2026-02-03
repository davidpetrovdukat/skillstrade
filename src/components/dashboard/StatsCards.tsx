'use client';

import { Plus, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { TOKEN_EXCHANGE_RATE } from '@/lib/constants';

interface StatsCardsProps {
    tokenBalance: number;
    activeOrdersCount: number;
    totalSpentTokens: number;
}

export function StatsCards({ tokenBalance, activeOrdersCount, totalSpentTokens }: StatsCardsProps) {
    const { convert } = useCurrencyStore();

    // Calculate Fiat value based on conversion rate
    const spentInEur = totalSpentTokens * TOKEN_EXCHANGE_RATE;
    const formattedFiat = convert(spentInEur);

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Token Balance */}
                <div className="group relative bg-[#121212] border border-white/10 p-6 flex flex-col justify-between min-h-[140px] hover:border-primary/50 transition-colors duration-300">
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Token Balance</p>
                        <Link href="/tokens" className="size-8 flex items-center justify-center bg-primary text-black hover:bg-white transition-colors">
                            <Plus className="w-5 h-5" />
                        </Link>
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
                        <p className="text-3xl font-bold text-white tracking-tighter">{activeOrdersCount}</p>
                        <p className="text-xs text-white/40 mt-1 font-mono uppercase">In Progress</p>
                    </div>
                </div>

                {/* Card 3: Total Spent */}
                <div className="group bg-[#121212] border border-white/10 p-6 flex flex-col justify-between min-h-[140px] hover:border-white/30 transition-colors">
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Spent</p>
                        <CreditCard className="text-gray-600 w-6 h-6 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-white tracking-tighter">
                            {totalSpentTokens.toLocaleString()} T
                        </p>
                        <p className="text-xs text-white/40 mt-1 font-mono uppercase">≈ {formattedFiat}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

