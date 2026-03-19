import { JoinRosterCTA } from "@/components/talents/JoinRosterCTA";
import PricingGrid from '@/components/pricing/PricingGrid';

export function Pricing() {
    return (
        <section className="border-b border-white/20 bg-background px-6 py-20 md:px-12">
            <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold uppercase leading-none font-heading md:text-5xl">
                    Token <span className="text-primary">Plans</span>
                </h2>
                <p className="font-mono text-white/60">Choose a bundle. Credits never expire.</p>
            </div>

            <div className="mb-12">
                <PricingGrid />
            </div>

            <div className="mt-16">
                <JoinRosterCTA />
            </div>
        </section>
    )
}
