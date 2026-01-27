'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '@/lib/data'

interface PortfolioGridProps {
    portfolio: PortfolioItem[]
}

export function PortfolioGrid({ portfolio }: PortfolioGridProps) {
    return (
        <section className="bg-surface">
            <div className="border-b border-white/10 p-6 md:px-10 py-6 flex justify-between items-end">
                <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none text-white font-heading">Recent Work</h3>
                <a className="hidden md:flex items-center gap-1 text-sm font-bold uppercase hover:text-primary transition-colors text-white font-heading" href="#">
                    View All <ArrowUpRight className="w-4 h-4" />
                </a>
            </div>

            {/* Grid with 1px gaps effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-white/10 border-b border-white/10">
                {portfolio.map((item) => (
                    <div key={item.id} className="relative group aspect-[4/3] bg-surface overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 w-full h-full">
                            {/* Using div driven bg-image for consistency with rest of app for now if easy replacement desired, but next/image optimal. Since I need to use external urls provided in data.ts which are valid, I'll use next/image here as it's cleaner for lists */}
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 bg-surface/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <p className="text-primary text-xs font-bold uppercase mb-1 font-mono">{item.category}</p>
                            <h4 className="text-xl font-bold uppercase text-white font-heading">{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
