'use client'

import { motion } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export function ProcessSteps() {
    return (
        <section className="py-20 border-t border-white/10 space-y-32 max-w-[1200px] mx-auto px-6">
            {/* Step 01: Curated Matching */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 space-y-6"
                >
                    <h3 className="text-primary text-sm font-bold tracking-[0.3em] uppercase font-heading">01. CURATED SELECTION</h3>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight tracking-tighter font-heading">
                        Find your perfect match.
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed font-mono">
                        Don't waste time sifting through thousands of profiles. Our roster is capped at the top 1%. Browse verified portfolios, check fixed-price packages, and select the talent that fits your specific tech stack and aesthetic.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full bg-card-bg border border-white/10 p-8 relative group"
                >
                    <div className="aspect-video w-full bg-white/5 overflow-hidden flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                        <div className="relative z-10 w-64 p-6 bg-white/5 backdrop-blur-md border border-white/10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-12 bg-white/10 overflow-hidden relative">
                                    <Image src="/avatars/arthur-uk.webp" alt="Profile" fill className="object-cover" />
                                </div>
                                <div className="space-y-1">
                                    <div className="w-24 h-2 bg-primary"></div>
                                    <div className="w-16 h-1 bg-white/20"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-1 bg-white/10"></div>
                                <div className="w-full h-1 bg-white/10"></div>
                                <div className="w-2/3 h-1 bg-white/10"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Step 02: Token Escrow */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 space-y-6"
                >
                    <h3 className="text-primary text-sm font-bold tracking-[0.3em] uppercase font-heading">02. BRIEFING & SMART ESCROW</h3>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight tracking-tighter font-heading">
                        Define the scope. Secure the funds.
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed font-mono">
                        Clear communication starts with a clear brief. Describe your needs directly to the freelancer. Once agreed, deposit tokens into our smart escrow. Your funds are safe—the freelancer sees the proof of funds, but can't touch them until the job is done.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full bg-card-bg border border-white/10 p-8 relative group"
                >
                    <div className="aspect-video w-full bg-white/5 overflow-hidden flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                            <div className="size-40 border border-primary/30 rounded-full animate-pulse absolute"></div>
                            <div className="size-32 border border-primary/50 rounded-full absolute"></div>
                            <Lock className="w-16 h-16 text-primary relative z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Step 03: Delivery & Release */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 space-y-6"
                >
                    <h3 className="text-primary text-sm font-bold tracking-[0.3em] uppercase font-heading">03. DELIVERY & OWNERSHIP</h3>
                    <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight tracking-tighter font-heading">
                        Approve the work. Own the result.
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed font-mono">
                        Receive the deliverables on time. Review the quality and request revisions if necessary. Once you hit 'Approve', the tokens are released to the creator, and full Intellectual Property (IP) rights transfer instantly to you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full bg-card-bg border border-white/10 p-8 relative"
                >
                    <div className="aspect-video w-full bg-white/5 overflow-hidden flex items-center justify-center p-8 md:p-12">
                        <div className="w-full bg-black border border-white/10 p-6 border-l-4 border-l-primary shadow-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span className="text-xs uppercase font-bold font-heading">Milestone Complete</span>
                                </div>
                                <span className="text-[10px] text-white/40 font-mono">JUST NOW</span>
                            </div>
                            <div className="text-sm font-medium mb-4 font-mono">Project: Neural Interface Design V2</div>
                            <div className="flex gap-3">
                                <div className="h-8 flex-1 bg-primary text-black text-[10px] flex items-center justify-center font-bold uppercase tracking-wider cursor-pointer font-heading hover:bg-white transition-colors">
                                    Release Tokens
                                </div>
                                <div className="h-8 flex-1 border border-white/20 text-[10px] flex items-center justify-center font-bold uppercase tracking-wider cursor-pointer font-heading hover:bg-white/10 transition-colors">
                                    Request Revision
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
