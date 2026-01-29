'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function ManifestoPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-white selection:bg-primary selection:text-black font-display overflow-x-hidden border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />

            {/* Progress Indicator (Fixed Right) */}
            <div className="fixed right-4 top-1/2 -translate-y-1/2 h-64 flex flex-col items-center justify-between z-50 mix-blend-difference hidden lg:flex pointer-events-none">
                <span className="text-[10px] rotate-90 mb-4 text-white/50 tracking-widest font-mono">SCROLL</span>
                <div className="w-[1px] h-full bg-white/20 relative">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-primary origin-top"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                    />
                </div>
                <span className="text-[10px] rotate-90 mt-4 text-white/50 tracking-widest font-mono">END</span>
            </div>

            <main className="flex flex-col w-full">
                {/* Chapter 01: The Problem */}
                <section className="min-h-screen flex items-center justify-center py-20 px-6 relative">
                    <div className="max-w-[640px] flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-heading">Chapter 01</p>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter uppercase font-heading"
                        >
                            The Agency<br />Model Is<br /><span className="text-white/30">Dead.</span>
                        </motion.h1>

                        <div className="w-full h-[1px] bg-white/10 my-2"></div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-2xl font-light leading-relaxed text-white/80 font-sans"
                        >
                            Gatekeepers. Bloat. The middleman tax. We are watching the slow collapse of the old guard.
                            Clients pay for overhead they don't use, and talent gets lost in the machine. It is time to burn the
                            bridge.
                        </motion.p>
                    </div>
                </section>

                {/* Visual Break */}
                <section className="w-full h-[85vh] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvD6C1wpRqGIBM4hCNYjOkWAT6MY2LIuRamCIiCKjzPPzm7ZROPMBJXtCTBB6FvGZAds-zWB-987dgR6TJnD4Xofv1ceCPQy4NKNXETMc0zcuYKHwtejAn8DBLt2gtqofptRIjNUwCFVU0lRnyp2lNp5eSinHuy8YrlzYxiU-lkdPPTpq5krGAQH1hoUcPhnZiUQ8Iy4M-oc8ShGnAGZ3FvxYWkb7dzJgoCInKvwai-jzjzP2RhM9F-tL1DAXkgr7fR1DV5rh9wqIs')" }}
                    />
                    <div className="absolute inset-0 bg-black/40"></div>

                    <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center leading-none tracking-tighter mix-blend-overlay opacity-50 select-none pointer-events-none font-heading text-white">
                            NO MORE<br />BARRIERS
                        </h2>
                    </div>

                    <div className="absolute bottom-[20%] left-0 w-full z-20 bg-primary/90 py-8 transform -rotate-1 shadow-[0_0_50px_rgba(208,249,6,0.2)]">
                        <div className="w-full overflow-hidden whitespace-nowrap">
                            <motion.p
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="text-black text-4xl md:text-6xl font-bold tracking-tight uppercase font-heading inline-block"
                            >
                                Mediocrity is the enemy &nbsp;•&nbsp; Mediocrity is the enemy &nbsp;•&nbsp; Mediocrity is the enemy &nbsp;•&nbsp; Mediocrity is the enemy &nbsp;•&nbsp;
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Chapter 02: Axioms */}
                <section className="min-h-screen flex items-center py-32 px-6 md:px-20 bg-[#1f230f] relative overflow-hidden">
                    {/* Background element */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[400px] font-bold text-white/[0.02] select-none -z-10 leading-none font-heading">
                        02
                    </div>

                    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        <div className="lg:col-span-4 sticky top-32 self-start">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <span className="h-[1px] w-12 bg-primary"></span>
                                <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-heading">Chapter 02</p>
                            </motion.div>
                            <h2 className="text-4xl font-bold leading-tight uppercase mb-8 font-heading">The Three<br />Axioms</h2>
                            <p className="text-white/60 text-lg font-sans">
                                We operate on a simple set of immutable laws designed to strip away the noise.
                            </p>
                        </div>

                        <div className="lg:col-span-8 flex flex-col gap-0 border-l border-white/10 pl-8 md:pl-16">
                            {/* Item 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="group py-12 border-b border-white/10"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                                    <span className="text-primary font-mono text-xl">01</span>
                                    <h3 className="text-4xl md:text-5xl font-bold uppercase text-white group-hover:text-primary transition-colors duration-300 font-heading">
                                        Transparency
                                    </h3>
                                </div>
                                <p className="text-xl text-white/70 pl-0 md:pl-[3.5rem] max-w-lg font-sans">
                                    No hidden fees. Radical honesty. You see where every dollar goes and who it goes to.
                                </p>
                            </motion.div>

                            {/* Item 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="group py-12 border-b border-white/10"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                                    <span className="text-primary font-mono text-xl">02</span>
                                    <h3 className="text-4xl md:text-5xl font-bold uppercase text-white group-hover:text-primary transition-colors duration-300 font-heading">
                                        Speed
                                    </h3>
                                </div>
                                <p className="text-xl text-white/70 pl-0 md:pl-[3.5rem] max-w-lg font-sans">
                                    Ship faster. Break things. Perfection is a stalling tactic. Momentum is our currency.
                                </p>
                            </motion.div>

                            {/* Item 3 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="group py-12 border-b border-white/10"
                            >
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                                    <span className="text-primary font-mono text-xl">03</span>
                                    <h3 className="text-4xl md:text-5xl font-bold uppercase text-white group-hover:text-primary transition-colors duration-300 font-heading">
                                        Quality
                                    </h3>
                                </div>
                                <p className="text-xl text-white/70 pl-0 md:pl-[3.5rem] max-w-lg font-sans">
                                    Top 1% talent only. We don't hire bodies; we partner with minds that intimidate us.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Chapter 03: The Vision */}
                <section className="min-h-[80vh] flex items-center py-20 px-6 md:px-20">
                    <div className="w-full flex flex-col items-end text-right">
                        <div className="max-w-[960px]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-end gap-4 mb-12"
                            >
                                <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase font-heading">Chapter 03</p>
                                <span className="h-[1px] w-12 bg-primary"></span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.85] tracking-tighter uppercase mb-12 text-white font-heading"
                            >
                                The Sovereign<br />Creative<br /><span className="text-transparent" style={{ WebkitTextStroke: '1px #d4ff00' }}>Economy</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/5 p-8 md:p-12 backdrop-blur-sm border-l-4 border-primary max-w-2xl ml-auto rounded-none"
                            >
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-white font-sans">
                                    We are building a world where talent is liquid, and ownership is absolute.
                                    The agency model hoards value. We distribute it.
                                    <span className="text-primary font-medium block mt-4">Welcome to the future of work.</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Signature Block / Custom Footer for Manifesto page implies using the main footer or a custom one?
                    The HTML has a custom footer block. I will include this block above the standardized Main Footer.
                */}
                <section className="border-t border-white/10 py-24 px-6 md:px-20 bg-[#171811]">
                    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-12">
                                <div className="flex flex-col gap-2">
                                    {/* Using a handwriting font via className defined in layout/globals or just standard fallback if not loaded perfectly */}
                                    <span className="text-4xl text-white/90 -rotate-6" style={{ fontFamily: 'var(--font-nothing-you-could-do), cursive' }}>Alex D.</span>
                                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest border-t border-white/20 pt-2 w-24">Founder</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-4xl text-white/90 -rotate-3" style={{ fontFamily: 'var(--font-nothing-you-could-do), cursive' }}>Maria K.</span>
                                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest border-t border-white/20 pt-2 w-24">Head of Design</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-4">
                            {/* Verified Icon - Lucide doesn't have 'verified' exact like Google Material, but 'BadgeCheck' or 'ShieldCheck' is close */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            <div className="flex flex-col items-end">
                                <p className="text-3xl font-bold tracking-tight text-white font-heading">SKILL—TRADE</p>
                                <p className="font-mono text-sm text-primary">EST. 2024 &nbsp;//&nbsp; MANIFESTO V1.0</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
