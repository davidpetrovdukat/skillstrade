import { Star, Shield, Zap, Percent } from 'lucide-react'

const features = [
    {
        icon: Star,
        title: "Top 1% Talent",
        description: "Rigorously vetted experts ready for your most complex projects."
    },
    {
        icon: Shield,
        title: "Secure Escrow",
        description: "Funds held safely until you approve milestones. Zero risk."
    },
    {
        icon: Zap,
        title: "Rapid Match",
        description: "AI-driven matching connects you with talent in under 24h."
    },
    {
        icon: Percent,
        title: "Low Fees",
        description: "Transparent pricing with industry-leading low platform fees."
    }
]

export function Features() {
    return (
        <section className="bg-background border-b border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`
              p-8 border-b md:border-b-0 border-white/20 group hover:bg-white/5 transition-colors
              ${index < 3 ? 'lg:border-r' : ''}
              ${index % 2 === 0 ? 'md:border-r' : ''}
            `}
                    >
                        <feature.icon className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-lg font-bold uppercase mb-2 font-heading">{feature.title}</h3>
                        <p className="text-sm text-white/60 font-mono leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
