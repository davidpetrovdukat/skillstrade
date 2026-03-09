'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function CheckoutSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("checkoutData");

        const timeout = setTimeout(() => {
            router.push("/dashboard/wallet?payment_success=true");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex items-center justify-center">
                    <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                        <div className="size-20 bg-[#D3E97A] text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_#D3E97A]">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-white">Payment Successful</h2>
                        <p className="text-gray-400 mb-8 max-w-sm">
                            Your transaction has been processed properly. <br />
                            Your tokens will be available in your wallet momentarily.
                        </p>
                        <div className="text-sm font-mono text-gray-500 animate-pulse">Redirecting to wallet...</div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
