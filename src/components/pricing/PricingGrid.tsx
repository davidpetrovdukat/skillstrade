'use client';

import { useState, useEffect } from "react";
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TOKEN_PACKAGES, TOKENS_PER_EUR } from '@/lib/constants';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface PricingGridProps {
    isDashboard?: boolean;
}

export default function PricingGrid({ isDashboard = false }: PricingGridProps) {
    const { convert, currency } = useCurrencyStore();
    const [customAmount, setCustomAmount] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
    };

    const router = useRouter();
    const { data: session } = useSession();

    const handleBuy = (pkgName: string, amountEuro: number, tokens: number) => {
        if (session) {
            // User is logged in -> Go to Checkout
            const checkoutData = {
                planId: pkgName,
                amount: amountEuro,
                currency: currency,
                tokens: tokens,
                description: `Purchase of ${tokens.toLocaleString()} Tokens (${pkgName})`
            };
            localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
            router.push('/dashboard/checkout');
        } else {
            // User is Guest -> Go to Login
            router.push('/login');
        }
    };

    const getExchangeRate = () => {
        const rates: Record<string, number> = { EUR: 1.00, USD: 1.09, GBP: 0.86 };
        // Validating currency is strictly one of the keys or fallback
        const safeCurrency = (currency in rates) ? currency : 'EUR';
        return rates[safeCurrency] || 1;
    };

    const getSymbol = () => {
        const symbols: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };
        const safeCurrency = (currency in symbols) ? currency : 'EUR';
        return symbols[safeCurrency] || '€';
    };

    const customAmountNum = parseFloat(customAmount) || 0;
    const rate = getExchangeRate();
    const amountInEur = customAmountNum / rate;
    const customTokens = Math.floor(amountInEur * TOKENS_PER_EUR);

    return (
        <section className={`grid grid-cols-1 md:grid-cols-2 ${isDashboard ? '2xl:grid-cols-4' : 'xl:grid-cols-4'} gap-6 w-full`}>
            {TOKEN_PACKAGES.map((pkg) => (
                <div
                    key={pkg.id}
                    className={`relative p-8 flex flex-col gap-6 group border transition-all duration-300 ${pkg.badge
                        ? 'bg-surface/80 border-primary shadow-[0_0_30px_-5px_var(--primary-color-alpha)]'
                        : 'bg-surface/50 border-white/10 hover:border-white/30'
                        }`}
                >
                    {pkg.badge && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold uppercase py-1 px-4 tracking-widest shadow-lg">
                            {pkg.badge}
                        </div>
                    )}

                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">{pkg.name}</h3>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-3xl font-bold text-white font-mono">
                                {mounted ? convert(pkg.price_eur) : `€${pkg.price_eur.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 text-center rounded border border-white/5">
                        <p className="text-white/60 text-xs uppercase tracking-wide mb-1">You Get</p>
                        <p className="text-3xl font-bold font-display text-primary">{pkg.tokens_total.toLocaleString('en-US')}</p>
                        <p className="text-primary/60 text-sm font-bold uppercase">Tokens</p>
                        {pkg.tokens_bonus > 0 && (
                            <div className="mt-2 text-[10px] text-green-400 font-mono uppercase bg-green-400/10 inline-block px-2 py-0.5 rounded">
                                +{pkg.tokens_bonus.toLocaleString('en-US')} Bonus
                            </div>
                        )}
                    </div>

                    <ul className="space-y-4 my-2">
                        {pkg.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                                <Check className="w-5 h-5 text-primary shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => handleBuy(pkg.name, pkg.price_eur, pkg.tokens_total)}
                        className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2 ${pkg.badge
                            ? 'bg-primary hover:bg-white text-black'
                            : 'bg-white/10 hover:bg-white text-white hover:text-black'
                            }`}
                    >
                        <Zap className="w-4 h-4 fill-current" />
                        Buy Now
                    </button>
                </div>
            ))}

            {/* Custom Card */}
            <div className="relative flex flex-col p-8 gap-6 min-h-[420px] transition-all duration-300 border border-white/10 hover:border-gray-500 bg-gradient-to-b from-[#1E1E1E] to-[#121212]">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                        Custom
                    </h3>
                    <p className="text-sm text-gray-400 leading-tight">
                        Need a specific amount? Enter your budget below.
                    </p>
                </div>
                <div className="flex flex-col gap-4 mt-2 flex-grow">
                    <div className="relative group">
                        <label
                            className="text-xs uppercase font-bold text-gray-500 mb-1 block group-focus-within:text-primary transition-colors"
                            htmlFor="custom-amount"
                        >
                            Enter Amount ({mounted ? currency : 'EUR'})
                        </label>
                        <div className="flex items-center border-b-2 border-gray-600 focus-within:border-primary transition-colors py-2">
                            <span className="text-2xl text-gray-400 mr-2">{mounted ? getSymbol() : '€'}</span>
                            <input
                                id="custom-amount"
                                type="number"
                                placeholder="0"
                                value={customAmount}
                                onChange={handleCustomChange}
                                className="w-full bg-transparent border-none p-0 text-3xl font-bold text-white placeholder-gray-700 focus:ring-0 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 py-4">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Calculation
                        </p>
                        <p className="text-lg text-white">
                            You get{" "}
                            <span className="text-primary font-bold">
                                {customTokens.toLocaleString('en-US')} Tokens
                            </span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => handleBuy(`Custom Amount`, amountInEur, customTokens)}
                    className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black">
                    <Zap className="w-4 h-4 fill-current" />
                    Buy Now
                </button>
            </div>
        </section>
    );
}
