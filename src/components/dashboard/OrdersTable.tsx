import { Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface OrdersTableProps {
    orders: any[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase tracking-wider border-l-4 border-primary pl-4 font-heading">Recent Activity</h3>
                {/* <button className="text-sm text-gray-400 hover:text-primary underline decoration-1 underline-offset-4">View All</button> */}
            </div>

            {orders.length === 0 ? (
                <div className="w-full h-40 flex flex-col items-center justify-center border border-white/10 border-dashed bg-[#121212] text-white/40 font-mono text-sm uppercase tracking-wide">
                    <p>No active orders found.</p>
                    <Link href="/services" className="mt-4 text-primary hover:text-white underline decoration-1 underline-offset-4">Browse Services</Link>
                </div>
            ) : (
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
                            {orders.map((order) => (
                                <tr key={order._id} className={`group hover:bg-white/[0.02] transition-colors ${order.status === 'Review' ? 'bg-primary/5' : ''}`}>
                                    <td className="p-4 text-sm font-medium text-white group-hover:text-primary transition-colors">
                                        {order.brief?.title || 'Custom Project'}
                                    </td>
                                    <td className="p-4 text-sm text-gray-400">{order.freelancerName || 'Pending'}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium border
                                            ${order.status === 'Completed' ? 'bg-white text-black border-white' :
                                                order.status === 'Review' ? 'bg-primary text-black border-primary animate-pulse' :
                                                    'bg-gray-800 text-gray-300 border-gray-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-white/60">
                                        {/* Simple date formatter */}
                                        {order.deadline ? new Date(order.deadline).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-wider border border-white/20 hover:border-primary px-3 py-1 flex items-center gap-2 ml-auto">
                                            View <ExternalLink className="w-3 h-3" />
                                        </button>
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
