'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Mail, Verified } from 'lucide-react'
import type { FreelancerProfile } from '@/lib/data'

interface ProfileHeroProps {
    profile: FreelancerProfile
}

export function ProfileHero({ profile }: ProfileHeroProps) {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10 bg-[#111] min-h-[calc(100vh-80px)]">
            {/* Left: B&W Portrait */}
            <div className="relative w-full h-[50vh] lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group">
                <div className="absolute inset-0 w-full h-full">
                    {/* Using a simple div with background image for the grayscale transition effect as next/image requires more setup for this specific hover effect or using CSS filters */}
                    {profile.meta.hero_url || profile.meta.avatar_url ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${profile.meta.hero_url || profile.meta.avatar_url})` }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-neutral-800" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent lg:hidden" />
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-between p-6 md:p-12 lg:p-16 xl:p-24 bg-[#171811] relative">
                <div className="flex flex-col gap-6">
                    {/* Role & Location */}
                    <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm md:text-base font-medium tracking-wide uppercase font-mono">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full" />
                            {profile.meta.role}
                        </span>
                        <span className="w-px h-4 bg-white/10" />
                        <span>{profile.meta.location} {profile.meta.flag}</span>
                    </div>

                    {/* Huge Name */}
                    <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold uppercase leading-[0.85] tracking-tighter text-white font-heading">
                        {profile.meta.name.split(' ')[0]} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                            {profile.meta.name.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    {/* Stats Row */}
                    <div className="flex border-y border-white/10 py-6 mt-4">
                        <div className="pr-6 md:pr-10 border-r border-white/10">
                            <p className="text-2xl md:text-3xl font-bold text-primary font-heading">{profile.stats.job_success_score}%</p>
                            <p className="text-xs uppercase tracking-wider text-white/40 mt-1 font-mono">Job Success</p>
                        </div>
                        <div className="px-6 md:px-10 border-r border-white/10">
                            <p className="text-2xl md:text-3xl font-bold text-white font-heading">{profile.stats.jobs_completed}</p>
                            <p className="text-xs uppercase tracking-wider text-white/40 mt-1 font-mono">Jobs Done</p>
                        </div>
                        <div className="pl-6 md:pl-10">
                            <p className="text-2xl md:text-3xl font-bold text-white font-heading">{profile.stats.avg_response_time}</p>
                            <p className="text-xs uppercase tracking-wider text-white/40 mt-1 font-mono">Reply Time</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full">
                    <button className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-black h-14 px-8 text-base font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group font-heading">
                        Hire Me
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="flex-1 rounded-none border border-white hover:bg-white hover:text-black text-white h-14 px-8 text-base font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-heading">
                        Message
                        <Mail className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    )
}
