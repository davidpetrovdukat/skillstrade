import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';

interface Transaction {
    _id: string;
    type: 'DEPOSIT' | 'SPEND' | 'EARNING' | 'WITHDRAWAL';
    amount: number;
    description: string;
    createdAt: string | Date;
}

interface RecentActivityProps {
    transactions: Transaction[];
}

export function RecentActivity({ transactions }: RecentActivityProps) {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-wider border-l-4 border-primary pl-4 font-heading">Recent Activity</h3>
            </div>

            {transactions.length === 0 ? (
                <div className="w-full h-40 flex flex-col items-center justify-center border border-white/10 border-dashed bg-[#121212] text-white/40 font-mono text-sm uppercase tracking-wide">
                    <p>No account activity found.</p>
                </div>
            ) : (
                <div className="w-full overflow-x-auto border border-white/10 bg-[#121212]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-[#161616]">
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Date</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/2">Description</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {transactions.map((tx) => (
                                <tr key={tx._id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 text-sm text-gray-400 font-mono">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3 text-white/20" />
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? (
                                                    <ArrowDownLeft className="w-4 h-4" />
                                                ) : (
                                                    <ArrowUpRight className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{tx.description}</p>
                                                <p className="text-[10px] text-white/40 uppercase tracking-wider">{tx.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`p-4 text-sm font-bold font-mono text-right ${tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? 'text-green-500' : 'text-white'
                                        }`}>
                                        {tx.type === 'DEPOSIT' || tx.type === 'EARNING' ? '+' : '-'}{tx.amount.toLocaleString()} T
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
