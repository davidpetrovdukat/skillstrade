
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Filter, Eye, Zap, Scale, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background-dark text-white font-display overflow-x-hidden">
            <Header />
            <main className="flex flex-col w-full">
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center min-h-[80vh] border-b border-white/10 px-6 py-20 text-center">
                    {/* Background Grid Texture */}
                    <div
                        className="absolute inset-0 z-0 opacity-10"
                        style={{
                            backgroundImage:
                                "linear-gradient(#373a27 1px, transparent 1px), linear-gradient(90deg, #373a27 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    ></div>
                    <div className="relative z-10 max-w-5xl flex flex-col gap-6 items-center">
                        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest mb-4 font-heading">
                            <span className="size-2 bg-primary animate-pulse"></span>
                            The Manifesto
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter uppercase text-white mix-blend-screen font-heading">
                            We Killed <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                                The Middleman.
                            </span>
                        </h1>
                        <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/60 font-normal leading-relaxed font-mono">
                            Agencies are slow. Marketplaces are chaotic. Skill-Trade is the new
                            standard of collaboration defined by speed, skill, and zero
                            friction.
                        </p>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="w-full border-b border-white/10 bg-[#1f230f]">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-[1440px] mx-auto">
                        <div className="p-12 flex flex-col items-start gap-2 group hover:bg-background-dark transition-colors duration-300">
                            <p className="text-sm font-mono uppercase tracking-widest text-gray-400">
                                Client Retention
                            </p>
                            <p className="text-6xl md:text-7xl font-bold text-primary tracking-tighter glowing-text font-heading">
                                98%
                            </p>
                            <p className="text-xs text-gray-500 mt-2 font-mono">
                                Consistent quality delivery
                            </p>
                        </div>
                        <div className="p-12 flex flex-col items-start gap-2 group hover:bg-background-dark transition-colors duration-300">
                            <p className="text-sm font-mono uppercase tracking-widest text-gray-400">
                                Avg. Project Kickoff
                            </p>
                            <p className="text-6xl md:text-7xl font-bold text-primary tracking-tighter glowing-text font-heading">
                                24h
                            </p>
                            <p className="text-xs text-gray-500 mt-2 font-mono">
                                From brief to build in one day
                            </p>
                        </div>
                        <div className="p-12 flex flex-col items-start gap-2 group hover:bg-background-dark transition-colors duration-300">
                            <p className="text-sm font-mono uppercase tracking-widest text-gray-400">
                                Niche Industries
                            </p>
                            <p className="text-6xl md:text-7xl font-bold text-primary tracking-tighter glowing-text font-heading">
                                50+
                            </p>
                            <p className="text-xs text-gray-500 mt-2 font-mono">
                                Specialized talent pools
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comparison Table: Evolution of Work */}
                <section className="py-24 px-6 md:px-12 lg:px-24 w-full bg-background-dark flex justify-center border-b border-white/10">
                    <div className="w-full max-w-6xl flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight font-heading">
                                Evolution of Work
                            </h2>
                            <div className="h-1 w-24 bg-primary"></div>
                        </div>
                        <div className="overflow-x-auto pb-4">
                            <table className="w-full min-w-[800px] border-collapse text-left">
                                <thead>
                                    <tr className="border-b-2 border-white/10">
                                        <th className="py-6 px-4 text-sm font-mono text-gray-500 uppercase w-1/4">
                                            Metric
                                        </th>
                                        <th className="py-6 px-4 text-xl font-bold text-gray-500 w-1/4 font-heading">
                                            Traditional Agency
                                        </th>
                                        <th className="py-6 px-4 text-xl font-bold text-gray-500 w-1/4 font-heading">
                                            Marketplaces
                                        </th>
                                        <th className="py-6 px-4 text-xl font-bold text-white bg-[#1f230f] border-t-4 border-primary w-1/4 relative font-heading">
                                            <div className="absolute -top-[2px] left-0 w-full h-[2px] bg-primary shadow-[0_0_20px_rgba(208,249,6,0.6)]"></div>
                                            Skill-Trade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    <tr className="group hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-4 text-sm font-mono text-gray-400 uppercase">
                                            Cost Efficiency
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Low (High Overhead)
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            High (Race to bottom)
                                        </td>
                                        <td className="py-6 px-4 text-white bg-[#1f230f] font-bold border-l border-r border-white/10 group-hover:bg-primary/10 transition-colors font-mono">
                                            Maximum Value
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-4 text-sm font-mono text-gray-400 uppercase">
                                            Vetting Process
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Manual / Slow
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Non-existent
                                        </td>
                                        <td className="py-6 px-4 text-white bg-[#1f230f] font-bold border-l border-r border-white/10 group-hover:bg-primary/10 transition-colors font-mono">
                                            Ruthless Curation
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/5 transition-colors">
                                        <td className="py-6 px-4 text-sm font-mono text-gray-400 uppercase">
                                            Speed to Hire
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            2-4 Weeks
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Instant (Low Quality)
                                        </td>
                                        <td className="py-6 px-4 text-white bg-[#1f230f] font-bold border-l border-r border-white/10 group-hover:bg-primary/10 transition-colors font-mono">
                                            <span className="text-primary">24 Hours</span>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/5 transition-colors border-b border-white/10">
                                        <td className="py-6 px-4 text-sm font-mono text-gray-400 uppercase">
                                            Talent Quality
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Variable
                                        </td>
                                        <td className="py-6 px-4 text-gray-500 font-mono">
                                            Hit or Miss
                                        </td>
                                        <td className="py-6 px-4 text-white bg-[#1f230f] font-bold border-l border-r border-b-4 border-white/10 border-b-primary group-hover:bg-primary/10 transition-colors relative font-mono">
                                            Top 1% Only
                                            <div className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-primary shadow-[0_0_20px_rgba(208,249,6,0.6)]"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Global Footprint Map */}
                <section className="relative w-full h-[600px] bg-[#12120e] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
                    {/* Map Background Image with overlay - Using CSS pattern as fallback/enhancement */}
                    <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3aV6DHYPHQyPUNbLWA7iXERrvVCKlgQlGPnFVNOxYl6WIOgQ6wf9C1yjYIAF_olMPHHQHa7AsRXgLySaocUAvMJ6N0Mb77IaGMs0GnYPTw_dJwjHStFGxvX_t5RaKr9Byugar02Uj-isr-ls1ucFgLtINZtTsibIMcO3b_Z13Tmyj2NbQFMLb-z_9OuAc4w4QqvrYUFQCSRrgF__6ztMcjDYBax1OzEPi8dcJ80MQe3rK2yyabzkBW9Pax8xbCpZdJRyawb6lo0kk')] bg-cover bg-center"></div>
                    {/* Dotted Overlay Pattern */}
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(#373a27_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                    {/* Content Overlay */}
                    <div className="relative z-20 flex flex-col items-center gap-6 text-center px-4">
                        <div className="flex items-center justify-center size-24 rounded-full border border-primary/20 bg-black/50 backdrop-blur-md mb-4 animate-pulse">
                            <Globe className="text-primary w-12 h-12" />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white drop-shadow-2xl font-heading">
                            From London <br />
                            to Lisbon...
                        </h2>
                        <p className="text-xl md:text-2xl font-light text-primary tracking-widest uppercase bg-black/60 px-4 py-2 backdrop-blur-sm border border-white/10 font-mono">
                            Talent knows no borders
                        </p>
                    </div>
                    {/* Decorative glowing nodes (abstract representation) */}
                    <div className="absolute top-1/3 left-1/3 size-3 bg-primary rounded-full shadow-[0_0_15px_#d0f906] animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 size-2 bg-primary rounded-full shadow-[0_0_15px_#d0f906] animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/3 size-3 bg-primary rounded-full shadow-[0_0_15px_#d0f906] animate-pulse delay-75"></div>
                </section>

                {/* Values Grid */}
                <section className="w-full bg-background-dark border-b border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1440px] mx-auto border-x border-white/10">
                        {/* Value 1 */}
                        <div className="border-b border-r border-white/10 p-12 md:p-16 flex flex-col justify-between min-h-[320px] group hover:bg-white/5 transition-colors cursor-default">
                            <Filter className="text-4xl w-12 h-12 text-gray-600 group-hover:text-primary transition-colors" />
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold uppercase text-white group-hover:text-primary transition-colors font-heading">
                                    Ruthless Curation
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-mono">
                                    We invite 100, we accept 1. We say no to 99% of applicants so
                                    you don't have to sift through the noise.
                                </p>
                            </div>
                        </div>
                        {/* Value 2 */}
                        <div className="border-b border-white/10 p-12 md:p-16 flex flex-col justify-between min-h-[320px] group hover:bg-white/5 transition-colors cursor-default">
                            <Eye className="text-4xl w-12 h-12 text-gray-600 group-hover:text-primary transition-colors" />
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold uppercase text-white group-hover:text-primary transition-colors font-heading">
                                    Radical Transparency
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-mono">
                                    No hidden fees. No black box algorithms. You see exactly what
                                    the talent earns and what we take.
                                </p>
                            </div>
                        </div>
                        {/* Value 3 */}
                        <div className="border-b md:border-b-0 border-r border-white/10 p-12 md:p-16 flex flex-col justify-between min-h-[320px] group hover:bg-white/5 transition-colors cursor-default">
                            <Zap className="text-4xl w-12 h-12 text-gray-600 group-hover:text-primary transition-colors" />
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold uppercase text-white group-hover:text-primary transition-colors font-heading">
                                    Speed as a Feature
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-mono">
                                    Momentum is the only metric that matters. Our platform is
                                    engineered to remove every millisecond of friction.
                                </p>
                            </div>
                        </div>
                        {/* Value 4 */}
                        <div className="p-12 md:p-16 flex flex-col justify-between min-h-[320px] group hover:bg-white/5 transition-colors cursor-default">
                            <Scale className="text-4xl w-12 h-12 text-gray-600 group-hover:text-primary transition-colors" />
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold uppercase text-white group-hover:text-primary transition-colors font-heading">
                                    Fairness
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-mono">
                                    We maximize earnings for talent and maximize value for clients.
                                    A balanced ecosystem thrives.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 px-6 bg-background-dark flex flex-col items-center text-center gap-12">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight max-w-4xl font-heading">
                        Ready to stop searching <br />
                        <span className="text-gray-500">and start building?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-md">
                        <button className="flex-1 h-14 flex items-center justify-center bg-primary text-black text-base font-bold uppercase tracking-wider hover:bg-white hover:scale-[1.02] transition-all font-heading">
                            Browse Talent
                        </button>
                        <button className="flex-1 h-14 flex items-center justify-center border border-white text-white text-base font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:scale-[1.02] transition-all font-heading">
                            Apply as Talent
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
