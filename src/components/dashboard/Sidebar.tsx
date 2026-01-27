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
                    <Link href="/dashboard/settings" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors group border-l-2 border-transparent hover:border-white/20">
                        <Settings className="w-5 h-5 group-hover:text-white transition-colors" />
                        <p className="text-sm font-medium tracking-wide uppercase">Settings</p>
                    </Link>
                    <Link href="/dashboard/support" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-colors group border-l-2 border-transparent hover:border-white/20">
                        <HelpCircle className="w-5 h-5 group-hover:text-white transition-colors" />
                        <p className="text-sm font-medium tracking-wide uppercase">Support</p>
                    </Link>
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="p-6 border-t border-white/10 bg-[#0f0f0f]">
                <div className="flex items-center gap-4 mb-4">
                    <div className="size-10 bg-gray-700 rounded-none overflow-hidden grayscale border border-white/20 relative">
                        {/* Using a placeholder avatar since the URL in HTML might strictly be an external one. Using local default if available would be better. */}
                        <Image
                            src="/avatars/default.jpg"
                            alt="User Profile"
                            fill
                            className="object-cover opacity-80"
                            sizes="40px"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-none">Alex M.</span>
                        <span className="text-xs text-gray-500 mt-1 font-mono">CLIENT</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-wider w-full">
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
