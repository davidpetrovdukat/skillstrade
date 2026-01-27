
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import PricingGrid from "@/components/pricing/PricingGrid";
import FAQSection from "@/components/pricing/FAQSection";
import TrustRow from "@/components/pricing/TrustRow";

export default function TokenPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background-dark text-white font-display border-x border-white/20 max-w-[1440px] mx-auto">
            <Header />
            <main className="flex-1 w-full px-6 py-12 md:px-12 md:py-20 flex flex-col gap-16">
                {/* 1. HERO SECTION */}
                <header className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none font-heading">
                        Simple Token System.
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-normal max-w-xl font-mono">
                        1 Token = €1. No hidden exchange rates. Funds held in escrow.
                    </p>
                </header>

                {/* 2. PRICING CARDS */}
                <PricingGrid />

                {/* 3. FAQ SECTION */}
                <FAQSection />

                {/* 4. TRUST ROW */}
                <TrustRow />
            </main>
            <Footer />
        </div>
    );
}
