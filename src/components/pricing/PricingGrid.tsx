'use client';

import { useState } from "react";
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import { TOKEN_PACKAGES, TOKENS_PER_EUR } from '@/lib/constants';
import { useCurrencyStore } from '@/store/useCurrencyStore';

export default function PricingGrid() {
    const { convert, currency } = useCurrencyStore();
    const [customAmount, setCustomAmount] = useState<string>("");

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
    };

    // Calculate tokens based on selected currency
    // TOKENS_PER_EUR = 100.
    // If currency is USD, user pays 1.09 USD for 100 tokens.
    // So if user enters 1.09 USD, we divide by rate (1.09) to get 1 EUR, then multiply by 100.
    const getExchangeRate = () => {
        // We'd ideally import these from constants or store if exposed, 
        // but for now we can infer or use a helper. 
        // Given store only exposes 'convert', let's import the rates map directly 
        // or just hardcode/copy logic if imports are tricky.
        // Actually, let's just import the symbols/rates if possible.
        // Waiting for import fix... checking usage. 
        // Since I can't easily change imports in this block safely without seeing top, 
        // I will assume standard rates used in store or fetch them.
        // Let's use a safe fallback map here or rely on the assumption that
        // convert(1) gives us the rate effectively? No, convert returns string.
        // I will hardcode the rates map here to match store for safety or 
        // better yet, import EXCHANGE_RATES from store file if exported?
        // It WAS exported in the previous view_file.
        const rates = { EUR: 1.00, USD: 1.09, GBP: 0.86 };
        return rates[currency] || 1;
    };

    const getSymbol = () => {
        const symbols = { EUR: '€', USD: '$', GBP: '£' };
        return symbols[currency] || '€';
    }

    const customAmountNum = parseFloat(customAmount) || 0;
    const rate = getExchangeRate();
    // Convert input amount back to base EUR then to tokens
    const amountInEur = customAmountNum / rate;
    const customTokens = Math.floor(amountInEur * TOKENS_PER_EUR);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
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
                                {convert(pkg.price_eur)}
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

                    <Link
                        href="/login"
                        className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2 ${pkg.badge
                            ? 'bg-primary hover:bg-white text-black'
                            : 'bg-white/10 hover:bg-white text-white hover:text-black'
                            }`}>
                        <Zap className="w-4 h-4 fill-current" />
                        Buy Now
                    </Link>
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
                            Enter Amount ({currency})
                        </label>
                        <div className="flex items-center border-b-2 border-gray-600 focus-within:border-primary transition-colors py-2">
                            <span className="text-2xl text-gray-400 mr-2">{getSymbol()}</span>
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
                <Link
                    href="/login"
                    className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black">
                    <Zap className="w-4 h-4 fill-current" />
                    Buy Now
                </Link>
            </div>
        </section>
    );
}
