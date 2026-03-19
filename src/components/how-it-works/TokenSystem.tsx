'use client'

import { Gauge, Wallet, RefreshCw } from 'lucide-react'

export function TokenSystem() {
    return (
        <section className="my-24 bg-card-bg border border-white/15 p-12 lg:p-20 max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-1/3">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6 leading-none font-heading">Why Tokens?</h2>
                    <p className="text-white/60 leading-relaxed font-mono">
                        Tokens keep pricing simple across the platform: 100 tokens always equals EUR 1.00.
                    </p>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-12">
                    {[
                        {
                            icon: Gauge,
                            title: "Clear Pricing",
                            desc: "A fixed conversion rate keeps every package and top-up easy to understand."
                        },
                        {
                            icon: Wallet,
                            title: "Fast Funding",
                            desc: "Top up once, hold your balance in-app, and pay for services without recalculating every order."
                        },
                        {
                            icon: RefreshCw,
                            title: "Refundable",
                            desc: "Unused balances and protected order funds are handled through the platform refund workflow."
                        }
                    ].map((item, i) => (
                        <div key={i} className="space-y-4">
                            <div className="size-10 bg-white/5 border border-white/10 flex items-center justify-center">
                                <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-bold uppercase tracking-wider text-sm font-heading">{item.title}</h4>
                            <p className="text-white/40 text-xs leading-relaxed font-mono">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
