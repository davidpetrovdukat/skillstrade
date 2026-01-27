'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NAV_ITEMS = [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Refund Policy', href: '/legal/refund' },
    // IP Transfer Agreement removed as requested
];

export function LegalSidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-64 flex-col justify-between border-r border-white/10 bg-[#121212] p-8 lg:w-80 md:flex flex-shrink-0">
            <div>
                <h1 className="mb-16 font-heading text-4xl font-bold tracking-tight text-white select-none">LEGAL</h1>
                <nav className="flex flex-col gap-6">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 text-sm font-semibold uppercase tracking-widest transition-colors ${isActive ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                            >
                                <span className={`h-1.5 w-1.5 transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-white'}`}></span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="flex flex-col gap-2 opacity-50">
                <div className="h-px w-12 bg-white/30"></div>
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                    © 2026 Skill-Trade
                </div>
            </div>
        </aside>
    );
}
