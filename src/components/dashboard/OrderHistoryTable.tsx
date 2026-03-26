'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getDisplayUsername } from '@/lib/freelancer-usernames';
import { getOrderFileDownloadPath } from '@/lib/order-file-storage';

type IdLike = string | { toString(): string };

interface OrderHistoryItem {
    _id: IdLike;
    status: string;
    brief?: {
        title?: string;
    };
    service?: {
        title?: string;
    };
    freelancer?: {
        name?: string;
    };
    createdAt: string | Date;
    totalTokens: number;
    attachments?: string[];
    aiDocument?: {
        status?: string;
        generatedPdfPath?: string;
        availableAt?: string | Date;
    };
}

interface OrderHistoryTableProps {
    orders: OrderHistoryItem[];
}

type TabType = 'All Orders' | 'Active' | 'Completed' | 'Cancelled';

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
    const [activeTab, setActiveTab] = useState<TabType>('All Orders');
    const router = useRouter();

    const hasActiveAIDocumentOrders = orders.some((order) => {
        const aiStatus = order.aiDocument?.status?.toUpperCase();
        const orderStatus = order.status.toUpperCase();

        return Boolean(aiStatus)
            && orderStatus !== 'COMPLETED'
            && orderStatus !== 'CANCELLED'
            && aiStatus !== 'FAILED'
            && aiStatus !== 'RELEASED';
    });

    useEffect(() => {
        if (!hasActiveAIDocumentOrders) {
            return;
        }

        let isCancelled = false;
        let timeoutId: number | undefined;
        let isProcessing = false;

        const runProcessingCycle = async () => {
            if (isCancelled || isProcessing) {
                return;
            }

            isProcessing = true;

            try {
                const response = await fetch('/api/orders/process', {
                    method: 'POST',
                    cache: 'no-store',
                });

                if (response.ok && !isCancelled) {
                    router.refresh();
                }
            } catch {
                // Ignore transient polling failures and retry on the next cycle.
            } finally {
                isProcessing = false;

                if (!isCancelled) {
                    timeoutId = window.setTimeout(runProcessingCycle, 12000);
                }
            }
        };

        void runProcessingCycle();

        return () => {
            isCancelled = true;
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [hasActiveAIDocumentOrders, router]);

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'All Orders') return true;

        const status = order.status.toUpperCase();
        if (activeTab === 'Active') return status === 'PENDING' || status === 'IN_PROGRESS' || status === 'REVIEW';
        if (activeTab === 'Completed') return status === 'COMPLETED';
        if (activeTab === 'Cancelled') return status === 'CANCELLED';

        return true;
    });

    const getStatusBadge = (status: string) => {
        const s = status.toUpperCase();
        if (s === 'PENDING' || s === 'IN_PROGRESS') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30">In Progress</span>;
        }
        if (s === 'REVIEW') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500 text-black animate-pulse">Review</span>;
        }
        if (s === 'COMPLETED') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D3E97A] text-black">Completed</span>;
        }
        if (s === 'CANCELLED') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-500 border border-red-500/30">Cancelled</span>;
        }
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">Pending</span>;
    };

    const getDownloadHref = (order: OrderHistoryItem) => {
        const storedPath = order.aiDocument?.generatedPdfPath || order.attachments?.[0];
        return storedPath ? getOrderFileDownloadPath(storedPath) : '#';
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold font-heading uppercase tracking-tight">Order History</h1>
                <Link href="/services" className="px-6 py-2 border border-white/20 text-white font-bold uppercase hover:bg-white hover:text-black transition-colors text-sm font-heading">
                    Browse Services
                </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-white/10 flex gap-6 overflow-x-auto no-scrollbar">
                {['All Orders', 'Active', 'Completed', 'Cancelled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as TabType)}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap 
                            ${activeTab === tab
                                ? 'text-[#D3E97A] border-b-2 border-[#D3E97A]'
                                : 'text-gray-400 border-b-2 border-transparent hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table or Empty State */}
            {filteredOrders.length === 0 ? (
                <div className="w-full min-h-[400px] flex flex-col items-center justify-center border border-white/10 border-dashed bg-[#121212] p-8 gap-4">
                    <div className="p-4 bg-white/5 rounded-full">
                        <Box className="w-8 h-8 text-white/40" />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-bold uppercase tracking-wider mb-2">No active orders</p>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                            You don&apos;t have any orders in this category yet. Start a new project to see it here.
                        </p>
                        <Link href="/services" className="text-[#D3E97A] font-bold uppercase text-xs tracking-widest hover:underline decoration-[#D3E97A] underline-offset-4">
                            Find Talent →
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-full overflow-x-auto border border-white/10 bg-[#121212]">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-[#161616]">
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/4">Project</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/5">Freelancer</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/6">Date</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/6">Amount</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/6">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredOrders.map((order) => (
                                <tr key={order._id.toString()} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 align-top">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-[#D3E97A] transition-colors leading-tight mb-1">
                                                {order.brief?.title || order.service?.title || 'Custom Project'}
                                            </span>
                                            <span className="text-xs text-gray-500 font-mono">
                                                ID: {order._id.toString().substring(order._id.toString().length - 8).toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-top">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Placeholder */}
                                            <div className="size-8 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 relative">
                                                {/* In real app, use Image with freelancer.user.avatarUrl */}
                                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                                    {getDisplayUsername(order.freelancer?.name)[0] || 'F'}
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white leading-none mb-1">{getDisplayUsername(order.freelancer?.name)}</span>
                                                <span className="text-[10px] text-gray-500 font-mono uppercase bg-white/5 px-1 rounded w-fit">Dev</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-top">
                                        <span className="text-sm text-gray-400 font-mono">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </td>
                                    <td className="p-4 align-top">
                                        <span className="text-sm font-bold text-white">
                                            {order.totalTokens.toLocaleString()} T
                                        </span>
                                    </td>
                                    <td className="p-4 align-top">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="p-4 align-top text-right">
                                            <div className="flex justify-end">
                                                {order.status === 'COMPLETED' ? (
                                                    <a
                                                    href={getDownloadHref(order)}
                                                    download
                                                    target="_blank"
                                                    className="text-xs font-bold uppercase tracking-wider bg-[#D3E97A] text-black px-4 py-2 hover:bg-white transition-colors flex items-center gap-2"
                                                >
                                                    Download <Box className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="text-xs font-bold uppercase tracking-wider border border-white/10 text-white/20 px-4 py-2 flex items-center gap-2 cursor-not-allowed"
                                                    title="Download unavailable"
                                                >
                                                    Download <Box className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
