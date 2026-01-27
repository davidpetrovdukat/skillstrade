import { Lock } from "lucide-react";

export default function TrustRow() {
    return (
        <section className="w-full pt-8 pb-12 border-t border-gray-800 mt-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Stripe */}
                <div className="h-8 flex items-center">
                    <span className="text-2xl font-bold tracking-tighter italic">
                        stripe
                    </span>
                </div>
                {/* PayPal */}
                <div className="h-8 flex items-center">
                    <span className="text-2xl font-bold italic text-white">
                        <span className="text-white">Pay</span>
                        <span className="text-white">Pal</span>
                    </span>
                </div>
                {/* VISA */}
                <div className="h-8 flex items-center">
                    <span className="text-2xl font-bold uppercase tracking-widest">
                        VISA
                    </span>
                </div>
                {/* Mastercard simulation */}
                <div className="h-8 flex items-center">
                    <div className="flex -space-x-3 items-center">
                        <div className="w-8 h-8 rounded-full bg-white opacity-80"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-400 opacity-80"></div>
                    </div>
                </div>
                {/* SSL */}
                <div className="h-8 flex items-center gap-1 border border-white px-2 py-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-widest">SSL SECURE</span>
                </div>
            </div>
        </section>
    );
}
