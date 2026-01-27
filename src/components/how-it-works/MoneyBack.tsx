'use client'

import { Gavel } from 'lucide-react'
import Link from 'next/link'

export function MoneyBack() {
    return (
        <section className="py-24 max-w-[1200px] mx-auto px-6">
            <div className="border border-dashed border-primary/50 p-12 lg:p-20 flex flex-col items-center text-center space-y-8 bg-primary/5">
                <div className="size-20 border border-primary flex items-center justify-center">
                    <Gavel className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter font-heading">
                    100% Money Back Guarantee
                </h2>
                <p className="text-white/80 max-w-2xl text-lg leading-relaxed italic font-mono">
                    &quot;If the final delivery does not meet the technical specifications outlined in your initial brief, our arbitration board will ensure a full token refund within 24 hours. No exceptions.&quot;
                </p>
                <div className="pt-8">
                    <Link href="/talents" className="bg-primary text-black px-12 py-5 text-lg font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 font-heading inline-block">
                        Browse Talent Now
                    </Link>
                </div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">
                    Subject to Skill-Trade Terms of Service | v4.2.0 Protocol
                </p>
            </div>
        </section>
    )
}
