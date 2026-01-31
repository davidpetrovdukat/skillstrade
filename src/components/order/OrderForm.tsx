'use client';

import { useState, useTransition } from 'react';
import { CloudUpload, Edit3, Lock, ArrowRight, ShieldCheck, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/order';

interface OrderFormProps {
    service: any;
    user: any;
    freelancer: any;
}

export function OrderForm({ service, user, freelancer }: OrderFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [requirements, setRequirements] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const totalTokens = service.priceTokens; // Add add-on logic later if needed

    const handleSubmit = () => {
        if (!requirements) {
            setError("Please provide project requirements.");
            return;
        }

        const formData = new FormData();
        formData.append('serviceId', service._id);
        formData.append('requirements', requirements);
        formData.append('totalTokens', totalTokens.toString());
        if (file) {
            formData.append('file', file);
        }

        startTransition(async () => {
            const result = await createOrder(formData);
            if (result.success) {
                router.push('/dashboard/orders');
            } else {
                setError(result.error || "Failed to create order");
            }
        });
    };

    return (
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: Details (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-16">

                {/* Section: Service Details */}
                <div className="group">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-heading">01 / Service Details</h2>
                    </div>
                    <div className="border border-white/10 p-6 bg-white/5 hover:border-primary transition-colors duration-300 rounded-none">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-48 aspect-video bg-cover bg-center rounded-none relative overflow-hidden group-hover:grayscale-0 grayscale transition-all duration-500 bg-white/10">
                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                            </div>
                            <div className="flex flex-col justify-between flex-1 py-1">
                                <div>
                                    <h3 className="text-2xl font-bold leading-tight mb-2 text-white font-heading">{service.title}</h3>
                                    <div className="flex items-center gap-2 text-white/60 mb-4 font-mono">
                                        <span className="text-sm uppercase tracking-wider">{service.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-white/10 overflow-hidden relative border border-white/10">
                                        {/* Avatar Fallback */}
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-gray-800">
                                            {freelancer.name[0]}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white leading-none font-heading">{freelancer.name}</p>
                                        <p className="text-xs text-white/60 uppercase mt-0.5 font-mono">{freelancer.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Project Brief */}
                <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-heading">02 / Project Brief</h2>
                    </div>
                    <div className="relative group">
                        <textarea
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            className="w-full bg-transparent text-xl text-white placeholder:text-gray-700 border-b-2 border-white/10 border-t-0 border-x-0 rounded-none focus:ring-0 focus:border-primary min-h-[120px] py-4 resize-none transition-colors duration-300 font-mono"
                            placeholder="Describe your project requirements here... Be specific about style, target audience, and scope."
                        ></textarea>
                        <div className="absolute bottom-4 right-2 pointer-events-none">
                            <Edit3 className="text-gray-700 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Section: Attachments */}
                <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-heading">03 / Attachments</h2>
                    </div>
                    <div className="border-2 border-dashed border-white/10 hover:border-primary hover:bg-white/5 transition-all duration-300 p-12 flex flex-col items-center justify-center gap-4 group cursor-pointer rounded-none relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <div className="h-16 w-16 bg-white/5 flex items-center justify-center rounded-none group-hover:bg-primary group-hover:text-black transition-colors duration-300 border border-white/10 relative">
                            <CloudUpload className="text-3xl" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-primary transition-colors font-heading">
                                {file ? file.name : "Drag & drop assets"}
                            </p>
                            <p className="text-white/40 text-sm mt-1 font-mono">or click to browse local files</p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 font-bold uppercase">
                        {error}
                    </div>
                )}

            </div>

            {/* RIGHT COLUMN: Summary (4 cols) */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-28">
                    <div className="border border-white/10 bg-[#161811]/90 backdrop-blur-md p-8 flex flex-col gap-6 shadow-2xl shadow-black/50 rounded-none relative overflow-hidden">
                        {/* Glassmorphism accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] pointer-events-none"></div>

                        <h3 className="text-xl font-bold uppercase tracking-tight border-b border-white/10 pb-4 text-white font-heading">
                            Order Summary
                        </h3>

                        <div className="flex flex-col gap-3 font-mono text-sm">
                            <div className="flex justify-between items-center text-white/60">
                                <span>Service Subtotal</span>
                                <span>{service.priceTokens.toLocaleString()} Tokens</span>
                            </div>
                            <div className="flex justify-between items-center text-white/60">
                                <span>Service Fee (0%)</span>
                                <span>0 Tokens</span>
                            </div>
                        </div>

                        <div className="py-6 border-y border-white/10 my-2">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-white uppercase font-heading">Total</span>
                                <span className="text-4xl font-bold text-primary tracking-tighter leading-none font-heading">{totalTokens.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-end mt-1">
                                <span className="text-xs font-mono text-primary uppercase tracking-widest">Tokens</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-white/5 p-3 border border-white/10">
                            <span className="text-xs text-white/60 uppercase font-mono">Available Balance</span>
                            <span className="text-sm font-bold text-white font-mono">{user.walletBalance?.toLocaleString() || 0} Tokens</span>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="w-full h-14 bg-primary hover:bg-white active:translate-y-0.5 transition-all text-black text-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2 rounded-none group font-heading disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Processing..." : "Confirm & Deposit"}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <div className="flex items-center justify-center gap-2 text-white/40">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-widest font-bold font-mono">100% Secure Transaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
