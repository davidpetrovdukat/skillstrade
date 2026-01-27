'use client'

import { FolderSearch, ShieldCheck, Speech } from 'lucide-react'

export function VettingFunnel() {
    return (
        <section className="py-24 border-t border-white/10 max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4 font-heading">
                    How we choose the top 1%
                </h2>
                <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: FolderSearch,
                        title: "Portfolio Audit",
                        desc: "Every freelancer's past work is manually reviewed for technical depth, aesthetic excellence, and high-stakes reliability."
                    },
                    {
                        icon: ShieldCheck,
                        title: "Identity Verification",
                        desc: "Biometric KYC and professional background checks ensure the talent on our platform is exactly who they claim to be."
                    },
                    {
                        icon: Speech,
                        title: "Technical Interview",
                        desc: "Live coding or design challenges conducted by our domain experts to verify real-time problem solving and soft skills."
                    }
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white/5 backdrop-blur-md p-10 space-y-6 border border-white/10 hover:border-primary/50 transition-all group lg:min-h-[300px]"
                    >
                        <item.icon className="w-10 h-10 text-primary" />
                        <h3 className="text-xl font-bold uppercase font-heading">{item.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed font-mono">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
