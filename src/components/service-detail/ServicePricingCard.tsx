
'use client';

import { Clock, RefreshCw, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { TOKEN_EXCHANGE_RATE } from '@/lib/constants';

interface ServicePricingCardProps {
    serviceId: string;
    price_tokens: number;
    description?: string;
    delivery_days: number;
    revisions: number;
    display_price_eur?: string;
    selectedAddonIds?: Set<string>;
}

export function ServicePricingCard({
    serviceId,
    price_tokens,
    delivery_days,
    revisions,
    selectedAddonIds
}: ServicePricingCardProps) {
    const { convert } = useCurrencyStore();

    // Calculate EUR value based on fixed rate 0.01
    const priceInEur = price_tokens * TOKEN_EXCHANGE_RATE;
    const formattedFiat = convert(priceInEur);

    // Format tokens with commas
    const formattedTokens = price_tokens.toLocaleString();

    // Construct Order URL
    const addonsParam = selectedAddonIds && selectedAddonIds.size > 0
        ? `&addons=${Array.from(selectedAddonIds).join(',')}`
        : '';

    const orderUrl = `/order?serviceId=${serviceId}${addonsParam}`;

    return (
        <div className="sticky top-28 w-full">
            <div className="bg-surface/60 backdrop-blur-md p-6 flex flex-col gap-6 relative overflow-hidden group border border-white/10">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[80px] pointer-events-none" />

                <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Total Price</p>
                    <h2 className="text-primary text-5xl font-display font-bold leading-none tracking-tight">
                        {formattedTokens}
                        <span className="text-2xl align-top ml-1">TOK</span>
                    </h2>
                    <p className="text-white/40 text-sm mt-2 font-mono">≈ {formattedFiat}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider">
                            <Clock className="w-4 h-4" />
                            Delivery
                        </div>
                        <span className="text-white font-mono font-bold text-lg">{delivery_days} Days</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider">
                            <RefreshCw className="w-4 h-4" />
                            Revisions
                        </div>
                        <span className="text-white font-mono font-bold text-lg">{revisions} Rounds</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={orderUrl}
                        className="w-full h-14 bg-primary hover:bg-white text-black font-bold text-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Order Now ({formattedTokens} T)
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button className="w-full h-12 bg-transparent border border-white/30 hover:border-primary hover:text-primary text-white font-bold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <MessageSquare className="w-5 h-5" />
                        Chat with Freelancer
                    </button>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 mt-2 border border-white/10">
                    <ShieldCheck className="text-white/60 w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-xs text-white/60 leading-tight">
                        <span className="text-white font-bold">Safe & Secure.</span> Funds are held in escrow until you approve the final deliverables.
                    </p>
                </div>
            </div>
        </div>
    );
}
