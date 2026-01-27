export interface LegalSection {
    title: string;
    content: string[]; // Array of paragraphs to allow easier rendering
}

export interface LegalDocument {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
}

export const LEGAL_DOCS: Record<string, LegalDocument> = {
    "terms": {
        title: "Terms of Service",
        lastUpdated: "January 24, 2026",
        sections: [
            {
                title: "1. Introduction",
                content: [
                    "Welcome to Skill-Trade. By accessing our platform, you agree to be bound by these Terms of Service. These terms govern your use of the website and all related services. Skill-Trade operates as a high-end decentralized talent marketplace where architectural precision meets digital execution. Your engagement with the platform constitutes a binding legal agreement."
                ]
            },
            {
                title: "2. Token Usage",
                content: [
                    "Skill-Trade utilizes a proprietary credit system known as 'Skill Tokens' to facilitate transactions between clients and freelancers.",
                    "Tokens operate on a strict 1:1 ratio with the US Dollar (USD). One Skill Token is equal to one USD. This fixed ratio ensures stability and transparency across all contracts. Tokens are non-refundable once committed to an active contract but may be withdrawn to a connected bank account upon contract completion, subject to platform processing fees."
                ]
            },
            {
                title: "3. User Conduct",
                content: [
                    "To maintain the integrity of the Skill-Trade ecosystem, all users must adhere to strict conduct guidelines. Violations will result in immediate account suspension.",
                    "Users are strictly prohibited from circumventing the platform to pay freelancers outside of the Skill-Trade ecosystem.",
                    "Harassment, hate speech, or discriminatory language towards any user or support staff is not tolerated and will be met with immediate termination.",
                    "Misrepresentation of skills, identity, or portfolio work constitutes fraud and will lead to a permanent ban and forfeiture of tokens.",
                    "Automated scraping, data mining, or reverse engineering of the platform's user base is explicitly forbidden."
                ]
            },
            {
                title: "4. Limitation of Liability",
                content: [
                    "To the fullest extent permitted by law, Skill-Trade shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services."
                ]
            }
        ]
    },
    "privacy": {
        title: "Privacy Policy",
        lastUpdated: "January 24, 2026",
        sections: [
            {
                title: "1. Data Collection",
                content: [
                    "[Placeholder] We collect minimal data necessary for platform operation..."
                ]
            },
            {
                title: "2. Data Usage",
                content: [
                    "[Placeholder] Your data is used to match you with opportunities..."
                ]
            }
        ]
    },
    "cookies": {
        title: "Cookie Policy",
        lastUpdated: "January 24, 2026",
        sections: [
            {
                title: "1. Cookie Usage",
                content: [
                    "[Placeholder] We use cookies to improve your experience..."
                ]
            }
        ]
    },
    "refund": {
        title: "Refund Policy",
        lastUpdated: "January 24, 2026",
        sections: [
            {
                title: "1. Refund Eligibility",
                content: [
                    "[Placeholder] Refunds are processed case-by-case..."
                ]
            }
        ]
    }
};
