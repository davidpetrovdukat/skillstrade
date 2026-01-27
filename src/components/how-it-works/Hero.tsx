'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-[1200px] mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white tracking-tighter text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 uppercase font-heading"
            >
                The Skill-Trade <span className="text-primary italic">Standard.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-16 font-mono"
            >
                A frictionless workflow designed for high-stakes projects. From elite curation to secure escrow, we redefine freelance excellence.
            </motion.p>

            {/* Abstract Workflow Graphic */}
            <div className="w-full relative flex items-center justify-between max-w-4xl px-4 h-32 hidden md:flex">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                </div>

                {[
                    { label: "Brief", active: true },
                    { label: "Match", active: false },
                    { label: "Escrow", active: true },
                    { label: "Review", active: false },
                    { label: "Success", active: true, icon: true }
                ].map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="relative z-10 flex flex-col items-center gap-4 group"
                    >
                        {step.icon ? (
                            <div className="size-6 bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(208,249,6,0.6)] rounded-sm">
                                <Check className="w-4 h-4 text-black" />
                            </div>
                        ) : (
                            <div className={`size-${step.active ? '4' : '3'} ${step.active ? 'bg-primary shadow-[0_0_15px_rgba(208,249,6,0.5)]' : 'bg-white/20 border border-white/50'} rounded-sm`}></div>
                        )}
                        <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors font-mono ${step.active ? 'text-primary' : 'text-white/40 group-hover:text-primary'}`}>
                            {step.label}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
