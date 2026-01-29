'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PROFILES } from '@/lib/data'

export function TalentCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const featuredTalents = PROFILES.slice(0, 8) // Limit to 8 profiles

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // Scroll by container width to simulate "pages"
            const scrollAmount = scrollRef.current.clientWidth
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="border-b border-white/20 py-20 overflow-hidden bg-background">
            <div className="px-6 md:px-12 mb-10 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none font-heading">
                    Meet The <br /><span className="text-primary">Collective</span>
                </h2>
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="size-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="size-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 no-scrollbar snap-x snap-mandatory"
            >
                {featuredTalents.map((talent) => (
                    <div
                        key={talent.id}
                        className="min-w-[calc(100%-48px)] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] h-[500px] bg-white/5 border border-white/10 backdrop-blur-sm relative group snap-start cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                    >
                        <Link href={`/talents/${talent.id}`} className="block h-full w-full">
                            <div className="h-[75%] w-full overflow-hidden relative">
                                {/* Use fallback or default avatar logic similar to ProfileHero */}
                                {talent.meta.hero_url ? (
                                    <Image
                                        src={talent.meta.hero_url}
                                        alt={talent.meta.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <Image
                                        src={talent.meta.avatar_url}
                                        alt={talent.meta.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold uppercase font-heading">{talent.meta.name}</h3>
                                    <span className="text-xl">{talent.meta.flag}</span>
                                </div>
                                <p className="text-white/40 text-sm font-mono mb-4">{talent.meta.role}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {talent.bio.skills.slice(0, 3).map(skill => (
                                        <span key={skill} className="text-[10px] uppercase border border-white/20 px-2 py-1 text-white/60 font-mono">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-8 px-6 md:px-12">
                <Link href="/talents" className="block w-full text-center bg-transparent border border-white/20 text-white py-6 text-xl font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-black hover:border-primary transition-all font-heading">
                    Explore All Freelancers
                </Link>
            </div>
        </section>
    )
}
