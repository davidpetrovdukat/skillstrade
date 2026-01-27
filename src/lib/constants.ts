
// Tokenomics Configuration

// 1. THE GOLDEN RULE
export const TOKEN_EXCHANGE_RATE = 0.01; // 1 Token = €0.01
export const TOKENS_PER_EUR = 100; // 100 Tokens = €1.00

// 2. TOKEN PACKAGES
export const TOKEN_PACKAGES = [
    {
        id: 'starter',
        name: 'Starter',
        price_eur: 50.00,
        tokens_base: 5000,
        tokens_bonus: 0,
        get tokens_total() { return this.tokens_base + this.tokens_bonus },
        badge: null,
        features: [
            "Ideal for quick tasks",
            "No bonus tokens",
            "Secure Escrow"
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price_eur: 200.00,
        tokens_base: 20000,
        tokens_bonus: 500, // 2.5%
        get tokens_total() { return this.tokens_base + this.tokens_bonus },
        badge: "Most Popular",
        features: [
            "Best value for small projects",
            "500 Bonus Tokens (2.5%)",
            "Priority Support"
        ]
    },
    {
        id: 'agency',
        name: 'Agency',
        price_eur: 1000.00,
        tokens_base: 100000,
        tokens_bonus: 5000, // 5%
        get tokens_total() { return this.tokens_base + this.tokens_bonus },
        badge: "Best Value",
        features: [
            "For serious volume",
            "5,000 Bonus Tokens (5%)",
            "Dedicated Account Manager"
        ]
    }
];
