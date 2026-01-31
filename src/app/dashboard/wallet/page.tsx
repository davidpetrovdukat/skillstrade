import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/dashboard/Sidebar';
import PricingGrid from '@/components/pricing/PricingGrid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { connectMongo } from '@/lib/db';
import { User } from '@/models/User';
import { Transaction } from '@/models/Transaction';
import { ArrowDownLeft, ArrowUpRight, History } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function WalletPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect('/login');

    await connectMongo();

    const user = await User.findOne({ email: session.user.email });
    if (!user) redirect('/login');

    const transactions = await Transaction.find({ user: user._id })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

    // Exchange rate logic: 100 T = 1 EUR
    const eurValue = (user.walletBalance / 100).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex flex-col gap-12">
                    {/* 1. BALANCE CARD (Hero) */}
                    <section className="relative w-full overflow-hidden rounded-none border border-white/10 bg-[#161616] p-8 md:p-12">
                        {/* Glassmorphism effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <div>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Current Balance</h2>
                                <div className="flex flex-col">
                                    <span className="text-5xl md:text-6xl font-bold font-heading text-[#D3E97A] tracking-tighter shadow-black drop-shadow-lg">
                                        {user.walletBalance.toLocaleString()} <span className="text-2xl align-top opacity-60">Tokens</span>
                                    </span>
                                    <span className="text-xl text-gray-500 font-mono mt-2">≈ {eurValue}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                <button className="bg-[#D3E97A] text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                    Top Up
                                </button>
                                <button className="border border-white/20 text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                                    <History className="w-4 h-4" />
                                    History
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* 2. BUY TOKENS SECTION */}
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-[#D3E97A]"></div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest font-heading">Instant Top-Up</h2>
                        </div>
                        <PricingGrid isDashboard={true} />
                    </section>

                    {/* 3. TRANSACTION HISTORY */}
                    <section className="flex flex-col gap-6 max-w-4xl">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-1 bg-white/20"></div>
                            <h2 className="text-2xl font-bold uppercase tracking-widest font-heading">Recent Transactions</h2>
                        </div>

                        <div className="w-full border border-white/10 bg-[#121212]">
                            {/* Header */}
                            <div className="grid grid-cols-12 p-4 border-b border-white/10 bg-[#161616] text-xs font-bold uppercase tracking-wider text-gray-500">
                                <div className="col-span-6 md:col-span-5">Description</div>
                                <div className="col-span-3 md:col-span-3 text-right">Amount</div>
                                <div className="col-span-3 md:col-span-4 text-right">Date</div>
                            </div>

                            {transactions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 font-mono text-sm uppercase">
                                    No transactions found.
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {transactions.map((tx: any) => (
                                        <div key={tx._id} className="grid grid-cols-12 p-4 items-center hover:bg-white/[0.02] transition-colors group">
                                            <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                                                <div className={`size-8 flex items-center justify-center rounded-full border ${tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? 'border-green-500/30 bg-green-900/10 text-green-500' : 'border-red-500/30 bg-red-900/10 text-red-500'}`}>
                                                    {tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                </div>
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                                                    {tx.description}
                                                </span>
                                            </div>
                                            <div className="col-span-3 md:col-span-3 text-right">
                                                <span className={`text-sm font-bold font-mono ${tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? 'text-green-500' : 'text-white'}`}>
                                                    {tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? '+' : '-'}{tx.amount.toLocaleString()} T
                                                </span>
                                            </div>
                                            <div className="col-span-3 md:col-span-4 text-right">
                                                <span className="text-xs text-gray-500 font-mono uppercase">
                                                    {new Date(tx.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}
