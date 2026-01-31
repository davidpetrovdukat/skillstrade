'use client';

import Link from 'next/link';
import { LayoutDashboard, List, Wallet } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 bg-[#121212] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-[calc(100vh-140px)] rounded-none z-20">
            {/* Top Section */}
            <div className="flex flex-col">
                <nav className="flex flex-col gap-1 p-4">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-4 px-4 py-3 border-l-2 transition-colors group",
                            isActive('/dashboard')
                                ? "bg-[#1e1e1e] border-primary"
                                : "border-transparent hover:bg-white/5 hover:border-white/20"
                        )}
                    >
                        <LayoutDashboard className={cn(
                            "w-5 h-5 transition-colors",
                            isActive('/dashboard') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )} />
                        <p className={cn(
                            "text-sm font-medium tracking-wide uppercase",
                            isActive('/dashboard') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )}>Overview</p>
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className={cn(
                            "flex items-center gap-4 px-4 py-3 border-l-2 transition-colors group",
                            isActive('/dashboard/orders')
                                ? "bg-[#1e1e1e] border-primary"
                                : "border-transparent hover:bg-white/5 hover:border-white/20"
                        )}
                    >
                        <List className={cn(
                            "w-5 h-5 transition-colors",
                            isActive('/dashboard/orders') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )} />
                        <p className={cn(
                            "text-sm font-medium tracking-wide uppercase",
                            isActive('/dashboard/orders') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )}>My Orders</p>
                    </Link>

                    <Link
                        href="/dashboard/wallet"
                        className={cn(
                            "flex items-center gap-4 px-4 py-3 border-l-2 transition-colors group",
                            isActive('/dashboard/wallet')
                                ? "bg-[#1e1e1e] border-primary"
                                : "border-transparent hover:bg-white/5 hover:border-white/20"
                        )}
                    >
                        <Wallet className={cn(
                            "w-5 h-5 transition-colors",
                            isActive('/dashboard/wallet') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )} />
                        <p className={cn(
                            "text-sm font-medium tracking-wide uppercase",
                            isActive('/dashboard/wallet') ? "text-primary" : "text-gray-400 group-hover:text-white"
                        )}>Wallet</p>
                    </Link>
                </nav>
            </div>

            {/* Bottom Section - Empty or Reserved for future use */}
            <div className="p-4 border-t border-white/10 bg-[#0f0f0f] hidden">
                {/* Removed as requested */}
            </div>
        </aside>
    );
}
