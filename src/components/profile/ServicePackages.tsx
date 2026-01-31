'use client'

import React from 'react'
import Link from 'next/link'
import { Layers, Check, Grid, Smartphone } from 'lucide-react'
import type { ServicePackage } from '@/lib/data'

interface ServicePackagesProps {
    services: ServicePackage[]
}

export function ServicePackages({ services }: ServicePackagesProps) {
    return (
        <section className="border-b border-white/10 bg-[#111] py-16">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <h3 className="text-lg font-bold uppercase tracking-tight mb-8 flex items-center gap-2 text-white font-heading">
                    <span className="w-2 h-2 bg-primary inline-block" />
                    Available Packages
                </h3>
                <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`min-w-[320px] md:min-w-[380px] border bg-surface p-8 flex flex-col hover:border-primary transition-colors group relative ${service.popular ? 'border-primary' : 'border-white/10'}`}
                        >
                            {service.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black text-[10px] font-bold uppercase px-2 py-1 font-mono">
                                    Popular
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-xl font-bold uppercase max-w-[70%] text-white font-heading">{service.title}</h4>
                                {/* Dynamically picking an icon or defaulting */}
                                <IconForService index={index} />
                            </div>

                            <div className="mb-8 flex-grow">
                                <p className="text-white/60 text-sm mb-4 font-mono">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features?.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-white/80 font-mono">
                                            <Check className="w-4 h-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-end justify-between pt-6 border-t border-white/10">
                                <span className="text-3xl font-bold text-white font-heading">€{service.price_tokens}</span>
                                <Link
                                    href={`/order?serviceId=${service.id}&packageIndex=${services.indexOf(service)}`}
                                    className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors font-heading inline-block text-center ${service.popular ? 'bg-primary text-black hover:bg-white' : 'bg-white text-black hover:bg-primary'}`}
                                >
                                    Select
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function IconForService({ index }: { index: number }) {
    const icons = [Layers, Grid, Smartphone]
    const Icon = icons[index % icons.length]
    return <Icon className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
}
