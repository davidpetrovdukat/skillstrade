import { Check } from "lucide-react";

interface PricingCardProps {
    name: string;
    tokens: number;
    price: number;
    features: string[];
    isPopular?: boolean;
    ctaText?: string;
    onSelect?: () => void;
    savings?: number;
}

export default function PricingCard({
    name,
    tokens,
    price,
    features,
    isPopular = false,
    ctaText = `Buy ${name}`,
    onSelect,
    savings,
}: PricingCardProps) {
    return (
        <div
            className={`relative flex flex-col p-8 gap-6 min-h-[420px] transition-all duration-300 group
      ${isPopular
                    ? "border-primary shadow-[0_0_0_1px_rgba(208,249,6,1)] z-10 bg-white/5 backdrop-blur-md border"
                    : "border border-white/10 hover:border-gray-500 bg-white/5 backdrop-blur-md"
                }`}
        >
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    Most Popular
                </div>
            )}
            <div className="flex flex-col gap-2">
                <h3
                    className={`text-xl font-bold uppercase tracking-wider ${isPopular ? "text-primary" : "text-gray-400"
                        }`}
                >
                    {name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-5xl font-bold tracking-tight">
                        {tokens.toLocaleString()}
                    </span>
                    <span className="text-xl font-medium text-gray-500">Tokens</span>
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-medium text-white">
                        €{price.toLocaleString()}
                    </p>
                    {savings && (
                        <span
                            className={
                                isPopular
                                    ? "text-primary text-sm font-bold uppercase tracking-wide"
                                    : "text-gray-400 text-sm font-bold uppercase tracking-wide"
                            }
                        >
                            Save €{savings}
                        </span>
                    )}
                </div>
            </div>
            <ul className="flex flex-col gap-3 flex-grow mt-4">
                {features.map((feature, idx) => (
                    <li
                        key={idx}
                        className={`flex gap-3 text-sm ${isPopular ? "text-white" : "text-gray-300"
                            }`}
                    >
                        <Check
                            className={`w-5 h-5 ${isPopular ? "text-primary" : "text-gray-500"
                                }`}
                        />
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                onClick={onSelect}
                className={`w-full h-12 font-bold uppercase tracking-wider transition-colors ${isPopular
                        ? "bg-primary hover:bg-white text-black"
                        : "border border-white text-white hover:bg-white hover:text-black"
                    }`}
            >
                {ctaText}
            </button>
        </div>
    );
}
