import Link from 'next/link';
import { Hexagon, LayoutDashboard, List, Wallet, Settings, HelpCircle, LogOut } from 'lucide-react';
import Image from 'next/image';

export function Sidebar() {
    return (
        <aside className="w-64 bg-[#121212] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-[calc(100vh-140px)] rounded-none z-20">
            {/* Top Section */}
            <div className="flex flex-col">
                {/* Logo Area - Optional if we strictly follow the HTML, but since we have a global header, duplicating the logo might look weird. 
                    However, the user asked to keep the left sidebar.
                    Let's keep the internal navigation links but maybe remove the 'Skill-Trade' header inside the sidebar if it duplicates the main header too much?
                    Actually, let's follow the HTML structure but maybe simplify the top part since the Global Header exists.
                    Wait, if we have a Global Header, usually the Sidebar sits BELOW it.
                    Let's assume the Sidebar renders inside the page content area.
                */}

                {/* Dashboard Menu */}
                <nav className="flex flex-col gap-1 p-4">
                    <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 bg-[#1e1e1e] border-l-2 border-primary group transition-colors">
                        <LayoutDashboard className="text-primary w-5 h-5 group-hover:text-primary transition-colors" />
                        <p className="text-primary text-sm font-medium tracking-wide uppercase">Overview</p>
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors group border-l-2 border-transparent hover:border-white/20">
                        <List className="w-5 h-5 group-hover:text-white transition-colors" />
                        <p className="text-sm font-medium tracking-wide uppercase">My Orders</p>
                    </Link>
                    <Link href="/dashboard/wallet" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors group border-l-2 border-transparent hover:border-white/20">
                        <Wallet className="w-5 h-5 group-hover:text-white transition-colors" />
                        <p className="text-sm font-medium tracking-wide uppercase">Wallet</p>
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
