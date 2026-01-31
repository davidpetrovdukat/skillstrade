'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShieldCheck, CreditCard, Calendar, User, MapPin } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface CheckoutData {
    planId: string;
    amount: number;
    currency: string;
    tokens: number;
    description: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const [checkout, setCheckout] = useState<CheckoutData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        name: '',
        address: '',
        city: '',
        postalCode: ''
    });

    useEffect(() => {
        const data = localStorage.getItem("checkoutData");
        if (!data) {
            router.push("/dashboard/wallet");
        } else {
            setCheckout(JSON.parse(data));
        }
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;

        // Simple formatting logic
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
        } else if (name === 'expiry') {
            // MM/YY
            const v = value.replace(/\D/g, "").slice(0, 4);
            if (v.length >= 3) formattedValue = `${v.slice(0, 2)}/${v.slice(2)}`;
            else formattedValue = v;
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock delay
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);

            // Clear checkout data
            localStorage.removeItem("checkoutData");

            // Redirect after 3 seconds
            setTimeout(() => {
                router.push("/dashboard/wallet?payment_success=true");
            }, 3000);
        }, 2000);
    };

    if (!checkout) return null;

    const vatRate = 0.2;
    const vatAmount = checkout.amount * vatRate;
    const total = checkout.amount + vatAmount;

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex justify-center">

                    {success ? (
                        <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                            <div className="size-20 bg-[#D3E97A] text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_#D3E97A]">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-white">Payment Successful</h2>
                            <p className="text-gray-400 mb-8 max-w-sm">
                                Your transaction has been processed properly. <br />
                                <span className="text-[#D3E97A] font-bold">{checkout.tokens.toLocaleString()} Tokens</span> have been added to your wallet.
                            </p>
                            <div className="text-sm font-mono text-gray-500">Redirecting to wallet...</div>
                        </div>
                    ) : (
                        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Summary Column */}
                            <div className="flex flex-col gap-6">
                                <h1 className="text-3xl font-bold uppercase tracking-widest font-heading mb-2">Checkout</h1>

                                <div className="bg-[#161616] border border-white/10 p-6 flex flex-col gap-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-2">Order Summary</h3>

                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-lg font-bold text-white">{checkout.planId}</p>
                                            <p className="text-sm text-gray-500">{checkout.description}</p>
                                        </div>
                                        <p className="text-lg font-bold text-white">€{checkout.amount.toFixed(2)}</p>
                                    </div>

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="font-mono">€{checkout.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">VAT (20%)</span>
                                        <span className="font-mono">€{vatAmount.toFixed(2)}</span>
                                    </div>

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold uppercase tracking-wider text-[#D3E97A]">Total</span>
                                        <span className="text-2xl font-bold font-mono text-[#D3E97A]">€{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-4 rounded border border-white/5">
                                    <Lock className="w-4 h-4" />
                                    <span>Payments are processed securely via Stripe. We do not store your card details.</span>
                                </div>
                            </div>

                            {/* Payment Form Column */}
                            <div className="flex flex-col gap-6">
                                <h2 className="text-xl font-bold uppercase tracking-wider text-white">Payment Details</h2>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors font-mono tracking-widest"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Expiry</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors font-mono"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">CVV</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    placeholder="123"
                                                    className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors font-mono"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <ShieldCheck className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Cardholder Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="JOHN DOE"
                                                className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors uppercase"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Billing City</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="city"
                                                placeholder="NEW YORK"
                                                className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors uppercase"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="mt-4 bg-[#D3E97A] text-black w-full py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Pay €{total.toFixed(2)}
                                            </>
                                        )}
                                    </button>

                                    <button type="button" onClick={() => router.back()} className="text-xs text-gray-500 hover:text-white uppercase tracking-wider text-center">
                                        Cancel Transaction
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                </main>
            </div>
            <Footer />
        </div>
    );
}
