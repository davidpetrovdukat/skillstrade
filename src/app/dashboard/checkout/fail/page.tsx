'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function CheckoutFailPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background text-white flex flex-col font-display">
            <Header />
            <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-140px)]">
                <div className="hidden md:flex">
                    <Sidebar />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 bg-[#0e0e0e] flex items-center justify-center">
                    <div className="w-full max-w-lg flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                        <div className="size-20 bg-red-500 text-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_red]">
                            <XCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-white">Payment Failed</h2>
                        <p className="text-gray-400 mb-8 max-w-sm">
                            Unfortunately, we were unable to process your payment. Please try again or use a different payment method.
                        </p>
                        <button
                            onClick={() => router.push("/dashboard/wallet")}
                            className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                        >
                            Return to Wallet
                        </button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
