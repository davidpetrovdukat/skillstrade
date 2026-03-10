'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Service-driven hero slider (right side). Images from /public.
const HERO_SLIDES = [
    { image: '/strategic_brand_identity.webp', title: 'BRAND SYSTEMS', subtitle: 'Strategy / Identity / Guidelines' },
    { image: '/scalable_SaaS_design_system.webp', title: 'PRODUCT DESIGN SYSTEMS', subtitle: 'UX Flows / UI / Components' },
    { image: '/series_a_pitch_deck.webp', title: 'INVESTOR DECKS', subtitle: 'Storyline / Slides / Presentation Design' },
    { image: '/product_visualization.webp', title: 'VISUAL LAUNCH ASSETS', subtitle: '3D / Motion / Product Imagery' },
] as const;
const HERO_SLIDES_LENGTH: number = HERO_SLIDES.length;

export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (HERO_SLIDES_LENGTH === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES_LENGTH);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const currentSlide = HERO_SLIDES_LENGTH > 0 ? HERO_SLIDES[currentIndex % HERO_SLIDES_LENGTH] : null;

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] border-b border-white/20 relative">
            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-white/20 bg-background z-10">
                <div>
                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase mb-8 font-heading">
                        Your Vision.<br />
                        <span className="text-primary">Our Execution.</span>
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-mono max-w-md mb-12">
                    Access vetted creative services for high-stakes projects. Clear scope, secure escrow, and production-ready delivery through a private expert network.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/post-brief" className="bg-primary text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors font-heading text-center">
                            POST A BRIEF
                        </Link>
                        <Link href="/services" className="border border-white/20 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-heading text-center">
                            VIEW SERVICES
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex relative items-end justify-center bg-[#111] p-8 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="relative w-full h-full max-h-[70vh] bg-neutral-800 rounded-t-[5rem] md:rounded-t-[20rem] overflow-hidden border border-white/10 group mt-10">
                    {currentSlide && (
                        <>
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentSlide.image}
                                    initial={{ opacity: 0.5, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        alt={`${currentSlide.title} – ${currentSlide.subtitle}`}
                                        src={currentSlide.image}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        unoptimized={currentSlide.image.startsWith('/')}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-black/80 backdrop-blur-md border border-white/20 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 bg-primary animate-pulse rounded-full" />
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentSlide.image}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className="text-white font-bold text-lg uppercase leading-none font-heading">
                                                {currentSlide.title}
                                            </p>
                                            <p className="text-white/40 text-xs font-mono uppercase mt-1">
                                                {currentSlide.subtitle}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
