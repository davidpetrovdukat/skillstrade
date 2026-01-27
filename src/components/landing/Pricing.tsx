import { Check } from 'lucide-react'
import { JoinRosterCTA } from "@/components/talents/JoinRosterCTA";
import PricingGrid from '@/components/pricing/PricingGrid';

const plans = [
    {
        name: "Starter",
        price: "€499",
        features: ["1 Active Request", "48h Turnaround", "Standard Support"],
        cta: "Get Starter",
        highlight: false
    },
    {
        name: "Pro",
        price: "€999",
        features: ["2 Active Requests", "24h Turnaround", "Slack Connect"],
        cta: "Get Pro",
        highlight: true
    },
    {
        name: "Agency",
        price: "€2499",
        features: ["5 Active Requests", "Priority Queue", "Dedicated PM"],
        cta: "Get Agency",
        highlight: false
    }
]

export function Pricing() {
    return (
        <section className="py-20 px-6 md:px-12 bg-background border-b border-white/20">
            <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-4 font-heading">
                    Token <span className="text-primary">Plans</span>
                </h2>
                <p className="text-white/60 font-mono">Choose a bundle. Credits never expire.</p>
            </div>

            <div className="mb-12">
                <PricingGrid />
            </div>

            <div className="mt-16">
                <JoinRosterCTA />
            </div>
        </section >
    )
}
