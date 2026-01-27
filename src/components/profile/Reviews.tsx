'use client'

import React from 'react'
import { Star, ArrowLeft, ArrowRight } from 'lucide-react'
import type { Review } from '@/lib/data'

interface ReviewsProps {
    reviews: Review[]
}

export function Reviews({ reviews }: ReviewsProps) {
    return (
        <section className="bg-surface py-16">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white font-heading">Client Feedback</h3>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border border-white/10 p-8 bg-[#111]/50">
                            <div className="flex gap-1 text-primary mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-white/20'}`} />
                                ))}
                            </div>
                            <p className="text-lg italic font-light text-white mb-6 font-mono">"{review.text}"</p>
                            <div className="flex items-center gap-3">
                                {review.avatar ? (
                                    <div
                                        className="w-10 h-10 bg-gray-600 rounded-full bg-cover"
                                        style={{ backgroundImage: `url(${review.avatar})` }}
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold font-heading">
                                        {review.author.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-sm uppercase text-white font-heading">{review.author}</p>
                                    <p className="text-xs text-white/40 font-mono">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
