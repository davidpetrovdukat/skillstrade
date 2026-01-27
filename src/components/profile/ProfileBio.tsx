'use client'

import React from 'react'
import type { FreelancerProfile } from '@/lib/data'

interface ProfileBioProps {
    bio: FreelancerProfile['bio']
}

export function ProfileBio({ bio }: ProfileBioProps) {
    return (
        <section className="border-b border-white/10 bg-surface">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
                <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-10">
                    <h3 className="text-lg font-bold uppercase tracking-tight sticky top-24 text-white font-heading">Bio</h3>
                </div>
                <div className="md:col-span-9 p-6 md:p-10 flex flex-col justify-between">
                    <div className="space-y-6">
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90 max-w-3xl font-mono">
                            {bio.tagline}
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-white/60 max-w-3xl font-mono">
                            {bio.about_text}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-10">
                        {bio.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 border border-white/10 bg-background text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors cursor-default text-white/60 font-mono"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
