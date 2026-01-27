
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Zap, Verified } from 'lucide-react'

export interface ServiceCardProps {
    id: string
    imageUrl?: string | null
    deliveryDays: number
    title: string
    price: number
    freelancer: {
        name: string
        slug: string
        avatarUrl: string
        verified: boolean
        rating: number
    }
}

import { useCurrencyStore } from '@/store/useCurrencyStore';
import { TOKEN_EXCHANGE_RATE } from '@/lib/constants';

export function ServiceCard({ id, imageUrl, deliveryDays, title, freelancer, price }: ServiceCardProps) {
    // Simple avatar fallback logic
    const avatarSrc = freelancer.avatarUrl?.startsWith('/') ? freelancer.avatarUrl : '/avatars/default.jpg'

    const { convert } = useCurrencyStore();
    const priceInEur = price * TOKEN_EXCHANGE_RATE;
    const formattedFiat = convert(priceInEur);

    return (
        <article className="group flex flex-col bg-surface border border-white/10 hover:border-primary transition-colors duration-300 rounded-none overflow-hidden h-full">
            <div className="relative aspect-video overflow-hidden bg-white/5">
                <div className="w-full h-full relative">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-white/20">
                            No Image
                        </div>
                    )}
                </div>
                <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-none backdrop-blur-sm flex items-center gap-1 z-10 font-heading">
                    <Zap className="w-3 h-3 text-primary fill-current" />
                    {deliveryDays} Days
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors font-heading line-clamp-2">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 mt-auto">
                    <div className="relative size-8 rounded-full overflow-hidden bg-white/10 shrink-0">
                        <Image
                            src={avatarSrc}
                            alt={freelancer.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs text-white/40 font-mono truncate">by <span className="text-white font-medium">{freelancer.name}</span></span>
                        {freelancer.verified && (
                            <div className="flex items-center gap-1 text-[10px] text-primary font-mono">
                                <Verified className="w-3 h-3" /> Vetted Pro
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-white/50 uppercase font-bold font-mono">Starting from</span>
                        <p className="text-primary font-bold font-mono">{formattedFiat} <span className="text-white/40 text-xs font-normal">({price.toLocaleString()} TKN)</span></p>
                    </div>
                    <Link
                        href={`/services/${id}`}
                        className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black hover:border-white text-xs font-bold uppercase tracking-wider transition-all rounded-none font-heading"
                    >
                        View
                    </Link>
                </div>
            </div>
        </article>
    )
}
