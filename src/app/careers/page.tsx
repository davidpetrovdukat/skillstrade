'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Globe, Wallet, Cpu, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    return (
        <div className="flex min-h-screen w-full flex-col max-w-[1440px] mx-auto bg-background text-white selection:bg-primary selection:text-black">
            <Header />

            <main className="w-full px-6 md:px-12 py-20 flex flex-col gap-24">
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center gap-10">
                    <div className="max-w-4xl flex flex-col gap-6">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[0.9] tracking-tighter font-heading">
                            Build the <span className="text-primary">infrastructure</span> of work.
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light font-sans">
                            We are looking for the engineers, designers, and operators defining the new economy.
                        </p>
                    </div>

                    {/* Visual Container */}
                    <div className="w-full h-[400px] md:h-[500px] border border-white/20 relative overflow-hidden bg-white/5 group">
                        {/* Grid overlay pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }}>
                        </div>

                        {/* Content Placeholder / Image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Using an abstract gradient/shape as placeholder if image fails, or the actual image from HTML */}
                            <img
                                alt="High-end 3D abstract wireframe"
                                className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo-gw0Qyni-7JPZw5Q9q92-6sfW86f31hBCR9XLO97Yyx8uUIquUrM4D8Wkn8HN4hKottMcmX0gK2AovzIvH7e24BakvkT1N0Vhx0cVWFSVV_beQF4mrNdRaqEqW0IpEDGrl9g_FTFleUKZI76hgXkRa8pXPRYWMxAedI_5_mufPih9Rgy4rgHQViv1VUu63kJKbN3eNnw9OzsnrXi0RJ16To2gb0G638IBrz_596IUaBLfCzuzU0xr2pZlZc0S9JxcHgjQQ1S7Mzd"
                            />
                        </div>

                        {/* Decorative tech elements */}
                        <div className="absolute top-4 left-4 text-[10px] text-primary font-mono tracking-widest uppercase border border-primary/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                            Sys.Status: Online
                        </div>
                        <div className="absolute bottom-4 right-4 text-[10px] text-white/50 font-mono tracking-widest uppercase">
                            Node_Ref: 001.442.X
                        </div>
                    </div>
                </section>

                {/* Culture Grid */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/20">
                        {/* Card 1 */}
                        <div className="flex flex-col gap-4 p-8 border-r border-b border-white/20 hover:bg-white/5 transition-colors duration-200 group h-full">
                            <div className="w-10 h-10 flex items-center justify-center bg-primary text-black mb-2">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors font-heading">
                                Remote First
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed font-mono">
                                Work from London, Bali, or a bunker. As long as you ship, your coordinates are irrelevant.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col gap-4 p-8 border-r border-b border-white/20 hover:bg-white/5 transition-colors duration-200 group h-full">
                            <div className="w-10 h-10 flex items-center justify-center bg-primary text-black mb-2">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors font-heading">
                                Crypto or Fiat
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed font-mono">
                                Instant payouts in your preferred currency. USDC, ETH, or traditional fiat wires.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col gap-4 p-8 border-r border-b border-white/20 hover:bg-white/5 transition-colors duration-200 group h-full">
                            <div className="w-10 h-10 flex items-center justify-center bg-primary text-black mb-2">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors font-heading">
                                Radical Autonomy
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed font-mono">
                                Own your shipping cycle. No micromanagement, just high-impact output.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="flex flex-col w-full">
                    <div className="flex items-end justify-between mb-8 px-1">
                        <h2 className="text-2xl font-bold uppercase tracking-tight font-heading">Open Positions</h2>
                        <span className="text-xs font-mono text-primary animate-pulse">● HIRING NOW</span>
                    </div>
                    <div className="flex flex-col border-t border-white/20">
                        {/* Position 1 */}
                        <a href="#" className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/20 p-6 md:px-6 md:py-8 hover:bg-primary transition-all duration-0 cursor-pointer">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl md:text-2xl font-bold group-hover:text-black transition-colors font-heading">
                                    Senior Next.js Engineer
                                </h3>
                                <span className="text-sm font-mono text-white/50 group-hover:text-black/70 transition-colors">
                                    [ Remote / EMEA ]
                                </span>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-2 text-primary group-hover:text-black font-medium text-lg uppercase underline decoration-2 underline-offset-4 font-heading">
                                Apply <ArrowRight className="w-5 h-5" />
                            </div>
                        </a>

                        {/* Position 2 */}
                        <a href="#" className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/20 p-6 md:px-6 md:py-8 hover:bg-primary transition-all duration-0 cursor-pointer">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl md:text-2xl font-bold group-hover:text-black transition-colors font-heading">
                                    Head of Growth
                                </h3>
                                <span className="text-sm font-mono text-white/50 group-hover:text-black/70 transition-colors">
                                    [ London / Hybrid ]
                                </span>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-2 text-primary group-hover:text-black font-medium text-lg uppercase underline decoration-2 underline-offset-4 font-heading">
                                Apply <ArrowRight className="w-5 h-5" />
                            </div>
                        </a>

                        {/* Position 3 */}
                        <a href="#" className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/20 p-6 md:px-6 md:py-8 hover:bg-primary transition-all duration-0 cursor-pointer">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl md:text-2xl font-bold group-hover:text-black transition-colors font-heading">
                                    Customer Success Lead
                                </h3>
                                <span className="text-sm font-mono text-white/50 group-hover:text-black/70 transition-colors">
                                    [ Remote / US East ]
                                </span>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-2 text-primary group-hover:text-black font-medium text-lg uppercase underline decoration-2 underline-offset-4 font-heading">
                                Apply <ArrowRight className="w-5 h-5" />
                            </div>
                        </a>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-10 flex flex-col items-center gap-2">
                    <p className="text-white text-lg font-light font-sans">Don't see a role?</p>
                    <a href="#" className="text-2xl md:text-3xl font-bold text-primary hover:text-white transition-colors flex items-center gap-2 underline decoration-2 underline-offset-8 font-heading">
                        Pitch us your role <ArrowUpRight className="w-8 h-8" />
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
}
