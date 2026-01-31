'use client';
import Link from 'next/link'
import { Zap, Menu, ChevronDown } from 'lucide-react'
import { useCurrencyStore, CurrencyCode } from '@/store/useCurrencyStore';
import { useState } from 'react';

export function Header() {
    const { currency, setCurrency } = useCurrencyStore();
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currencies: CurrencyCode[] = ['EUR', 'USD', 'GBP'];

    const handleCurrencySelect = (code: CurrencyCode) => {
        setCurrency(code);
        setIsCurrencyOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/20 bg-background/95 backdrop-blur-sm px-6 py-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {/* <Zap className="text-primary w-6 h-6 fill-current" /> */}
                {/* <span className="text-xl font-bold tracking-tighter uppercase font-heading">SKILL-TRADE</span> */}
                <img src="/logo.png" alt="Skill Trade Logo" className="h-8 w-auto object-contain" />
            </Link>

            <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest font-heading">
                <Link className="hover:text-primary transition-colors" href="/talents">Talent</Link>
                <Link className="hover:text-primary transition-colors" href="/services">Services</Link>
                <Link className="hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
                <Link className="hover:text-primary transition-colors" href="/tokens">Tokens</Link>
            </nav>

            <div className="hidden md:flex items-center gap-6">
                <div className="relative">
                    <button
                        onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                        className="flex items-center gap-1 text-sm font-mono text-white hover:text-primary transition-colors focus:outline-none"
                    >
                        <span>{currency}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isCurrencyOpen && (
                        <div className="absolute top-full right-0 mt-2 w-24 bg-[#121212] border border-white/20 shadow-xl flex flex-col z-50">
                            {currencies.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => handleCurrencySelect(c)}
                                    className={`px-4 py-2 text-left text-sm font-mono hover:bg-white/10 transition-colors ${currency === c ? 'text-primary' : 'text-white'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <Link className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors font-heading" href="/login">
                    Log In
                </Link>

                <Link href="/signup" className="bg-primary text-black px-6 py-2 text-sm font-bold uppercase hover:bg-white transition-colors border border-transparent font-heading">
                    Join Now
                </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-6 h-6" />
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-[73px] bg-background z-40 flex flex-col p-6 md:hidden animate-in fade-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-widest font-heading mb-8">
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/talents">Talent</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/services">Services</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
                        <Link onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors" href="/tokens">Tokens</Link>
                    </nav>
                    <div className="flex flex-col gap-4">
                        <Link onClick={() => setIsMenuOpen(false)} href="/login" className="text-xl font-bold uppercase tracking-widest hover:text-primary transition-colors font-heading text-left">
                            Log In
                        </Link>
                        <Link onClick={() => setIsMenuOpen(false)} href="/signup" className="bg-primary text-black px-6 py-4 text-center text-lg font-bold uppercase hover:bg-white transition-colors border border-transparent font-heading">
                            Join Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
