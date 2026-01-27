import { Download } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/dashboard-data';
import { cn } from '@/lib/utils'; // Ensure we have utils, or fallback to standard class strings if this fails, but strict mode implies we probably have it or should. I'll use standard just in case or assume cn is present.
// Actually, earlier code edits suggested cn might not be there. I'll stick to template literals for safety unless I confirmed utils exist.

export function OrdersTable() {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-wider border-l-4 border-primary pl-4 font-heading">Recent Activity</h3>
                <button className="text-sm text-gray-400 hover:text-primary underline decoration-1 underline-offset-4">View All</button>
            </div>
            <div className="w-full overflow-x-auto border border-white/10 bg-[#121212]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-[#161616]">
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Project Name</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/5">Freelancer</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/6">Status</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/6">Delivery</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {MOCK_ORDERS.map((order, index) => (
                            <tr key={order.id} className={`group hover:bg-white/[0.02] transition-colors ${order.status === 'Review' ? 'bg-primary/5' : ''}`}>
                                <td className="p-4 text-sm font-medium text-white group-hover:text-primary transition-colors">
                                    {order.projectName}
                                </td>
                                <td className="p-4 text-sm text-gray-400">{order.freelancer}</td>
                                <td className="p-4">
                                    {order.status === 'In Progress' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium bg-gray-800 text-gray-300 border border-gray-600">
                                            In Progress
                                        </span>
                                    )}
                                    {order.status === 'Review' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold bg-primary text-black animate-pulse">
                                            Review
                                        </span>
                                    )}
                                    {order.status === 'Completed' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium bg-white text-black border border-white">
                                            Completed
                                        </span>
                                    )}
                                </td>
                                <td className={`p-4 text-sm ${order.status === 'Review' ? 'text-primary' : order.status === 'In Progress' ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {order.deliveryTime}
                                </td>
                                <td className="p-4 text-right">
                                    {order.status === 'In Progress' && (
                                        <button className="text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-wider border border-white/20 hover:border-primary px-3 py-1">
                                            View
                                        </button>
                                    )}
                                    {order.status === 'Review' && (
                                        <button className="text-sm font-bold bg-primary text-black hover:bg-white hover:text-black transition-colors uppercase tracking-wider px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-[2px] active:shadow-none">
                                            Release Funds
                                        </button>
                                    )}
                                    {order.status === 'Completed' && (
                                        <a className="flex items-center justify-end gap-1 text-sm font-medium text-gray-400 hover:text-primary transition-colors uppercase tracking-wide" href="#">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
