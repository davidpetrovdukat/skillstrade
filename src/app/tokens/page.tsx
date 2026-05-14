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
                <header className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none font-heading">
                        Simple Token System.
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-normal max-w-xl font-mono">
                        100 Tokens = EUR 1.00. Clear pricing, protected checkout, and internal escrow until approval.
                    </p>
                    <p className="text-white/60 text-lg md:text-xl font-normal max-w-xl font-mono">
                    Tokens are optional. You can always purchase any service directly without
                    pre-buying Tokens. Token packages offer convenience and bonus credits for clients
                    who plan to use the Platform regularly.
                    </p>
                </header>

                <PricingGrid />
                <FAQSection />
                <TrustRow />
            </main>
            <Footer />
        </div>
    );
}
