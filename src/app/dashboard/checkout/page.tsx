'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, MapPin, Phone, Calendar, Globe } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { generatePaydecaSession } from "@/actions/paydeca";

interface CheckoutData {
    planId: string;
    amount: number;
    currency: string;
    tokens: number;
    description: string;
}

interface BillingFormData {
    phone: string;
    country: string;
    street: string;
    city: string;
    zip: string;
    dateOfBirth: string;
}

const DEFAULT_BILLING_INFO: BillingFormData = {
    phone: '',
    country: 'GB',
    street: '',
    city: '',
    zip: '',
    dateOfBirth: '',
};

function parseCheckoutData(): CheckoutData | null {
    if (typeof window === "undefined") {
        return null;
    }

    const raw = window.localStorage.getItem("checkoutData");
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as CheckoutData;
    } catch (error) {
        console.error("Failed to parse checkout data", error);
        return null;
    }
}

function parseBillingInfo(): BillingFormData {
    if (typeof window === "undefined") {
        return DEFAULT_BILLING_INFO;
    }

    const raw = window.localStorage.getItem("billingInfo");
    if (!raw) {
        return DEFAULT_BILLING_INFO;
    }

    try {
        return { ...DEFAULT_BILLING_INFO, ...(JSON.parse(raw) as Partial<BillingFormData>) };
    } catch (error) {
        console.error("Failed to parse saved billing info", error);
        return DEFAULT_BILLING_INFO;
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const [checkout] = useState<CheckoutData | null>(parseCheckoutData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<BillingFormData>(parseBillingInfo);

    useEffect(() => {
        if (!checkout) {
            router.replace("/dashboard/wallet");
        }
    }, [checkout, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            window.localStorage.setItem("billingInfo", JSON.stringify(updated));
            return updated;
        });
    };

    const vatRate = 0.2;
    const vatAmount = checkout ? checkout.amount * vatRate : 0;
    const total = checkout ? checkout.amount + vatAmount : 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkout) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await generatePaydecaSession(
                checkout.tokens,
                checkout.description,
                total,
                formData
            );

            if (result.success && result.redirectUrl) {
                window.location.href = result.redirectUrl;
                return;
            }

            if (!result.success) {
                setError(result.error || "Transaction failed to initiate.");
                return;
            }

            setError("Transaction failed to initiate.");
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!checkout) return null;

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex justify-center">
                    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-3xl font-bold uppercase tracking-widest font-heading mb-2">Checkout</h1>

                            <div className="bg-[#161616] border border-white/10 p-6 flex flex-col gap-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-2">Order Summary</h3>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-bold text-white">{checkout.planId}</p>
                                        <p className="text-sm text-gray-500">{checkout.description}</p>
                                    </div>
                                    <p className="text-lg font-bold text-white">в‚¬{checkout.amount.toFixed(2)}</p>
                                </div>

                                <div className="h-px bg-white/10 my-2"></div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="font-mono">в‚¬{checkout.amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">VAT (20%)</span>
                                    <span className="font-mono">в‚¬{vatAmount.toFixed(2)}</span>
                                </div>

                                <div className="h-px bg-white/10 my-2"></div>

                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold uppercase tracking-wider text-[#D3E97A]">Total</span>
                                    <span className="text-2xl font-bold font-mono text-[#D3E97A]">в‚¬{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 p-4 rounded border border-white/5">
                                <Lock className="w-4 h-4" />
                                <span>Secured by Paydeca. We do not store your card details.</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                                Billing Details
                            </h2>

                            {isSubmitting ? (
                                <div className="w-full h-64 bg-white/5 rounded flex flex-col items-center justify-center animate-pulse">
                                    <Loader2 className="w-8 h-8 animate-spin text-[#D3E97A] mb-4" />
                                    <p className="text-gray-400">Redirecting to Secure Payment...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Date of Birth</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="15551234567"
                                                    className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/10 my-2"></div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Street Address</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="street"
                                                placeholder="123 MAIN ST"
                                                className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors uppercase"
                                                value={formData.street}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City</label>
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
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">ZIP / Postcode</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    placeholder="10001"
                                                    className="w-full bg-[#121212] border border-white/20 p-3 text-white focus:border-[#D3E97A] focus:outline-none transition-colors uppercase"
                                                    value={formData.zip}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Country Code</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="country"
                                                placeholder="GB"
                                                maxLength={2}
                                                className="w-full bg-[#121212] border border-white/20 p-3 pl-10 text-white focus:border-[#D3E97A] focus:outline-none transition-colors uppercase font-mono"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Globe className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="text-[10px] text-gray-500">2-letter ISO code (e.g. GB, US, LV)</span>
                                    </div>

                                    {error && (
                                        <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-3 text-sm font-bold text-center">
                                            {error}
                                        </div>
                                    )}

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
                                            <>Proceed to Payment</>
                                        )}
                                    </button>

                                    <button type="button" onClick={() => router.back()} className="text-xs text-gray-500 hover:text-white uppercase tracking-wider text-center">
                                        Cancel Transaction
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
