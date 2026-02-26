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
        title: "Terms and Conditions",
        lastUpdated: "February 2, 2026",
        sections: [
            {
                title: "1. INTRODUCTION AND ACCEPTANCE",
                content: [
                    "1.1. Parties. These Terms and Conditions (“Terms”) constitute a legally binding agreement between RENATASTRADAS MB (“Company”, “we”, “us”, “SkillsTrade”), a company registered in Lithuania (Company Number: 307123019; VAT: LT100017846812), with its registered office at Šiauliai, Vytauto g. 147-18, LT-76341, and you (“User”, “Client”, “Freelancer”, “you”).",
                    "1.2. Nature of the Platform. SkillsTrade is an online marketplace that connects businesses and individuals (“Clients”) with vetted independent professionals (“Freelancers”) for the provision of specialized services.",
                    "Important Notice: The Company acts solely as an intermediary and technological service provider. We are not the employer of any Freelancer, nor are we a party to the direct service contracts formed between Clients and Freelancers, except for the limited purpose of processing payments and holding funds in Escrow.",
                    "1.3. Acceptance. By registering an account, purchasing Tokens, posting a Brief, or ordering a Service Package on skills-trade.com (the “Site”), you expressly agree to be bound by these Terms. If you do not agree, you must cease using the Site immediately."
                ]
            },
            {
                title: "2. DEFINITIONS",
                content: [
                    "To ensure clarity, the following terms are defined:",
                    "• Account: The registered user profile on the Platform (Client or Freelancer).",
                    "• Tokens (T): The internal utility currency used to transact within the Site. 1 Token represents a specific value in Fiat currency as defined at the time of purchase.",
                    "• Service Package: A pre-defined scope of work listed by a Freelancer (e.g., \"Landing Page Copy\") with a fixed price and delivery timeline.",
                    "• Custom Brief: A request posted by a Client for a bespoke project that does not fit into a standard Service Package.",
                    "• Order: A binding agreement between a Client and a Freelancer, formed either by purchasing a Service Package or accepting a proposal for a Custom Brief.",
                    "• Escrow: The holding of Tokens by the Company to ensure payment security for both parties.",
                    "• Deliverables: The final work product (files, documents, code, designs) delivered by the Freelancer to the Client.",
                    "• Vetted Talent: Freelancers who have undergone the Company’s verification process regarding their identity and portfolio."
                ]
            },
            {
                title: "3. ACCOUNT ELIGIBILITY AND SECURITY",
                content: [
                    "3.1. Eligibility. You must be at least 18 years old to use the Service. By creating an account, you confirm you have the legal capacity to enter into a binding contract.",
                    "3.2. Verification and Vetting. To maintain the \"Premium/Vetted\" status of the Platform, Freelancers must undergo a mandatory verification process (\"Vetting\") before listing services. We reserve the right to request identity documentation (KYC) and portfolio evidence.",
                    "3.3. Security. You are responsible for safeguarding your login credentials. RENATASTRADAS MB is not liable for any loss (including theft of Tokens) arising from unauthorized access to your Account due to your failure to secure your device or password."
                ]
            },
            {
                title: "4. TOKEN SYSTEM AND PAYMENTS",
                content: [
                    "4.1. Purchasing Tokens. Services on the Site are purchased exclusively using Tokens. Users may purchase Tokens using fiat currency (EUR, GBP, USD) via Visa or MasterCard.",
                    "• No Cash Value: Tokens are a limited license to use digital features of our Site. They are not cryptocurrency, financial instruments, or investment vehicles.",
                    "• Exchange Rate: The price of Tokens is displayed at checkout. The Company reserves the right to adjust Token packages and pricing at any time.",
                    "4.2. Refunds of Tokens to Fiat. Users may request a refund of unused purchased Tokens back to their original payment method (Fiat currency) within 14 days of purchase, provided those Tokens have not been committed to an active Order.",
                    "• Refund requests must be made via support ticket.",
                    "• The Company reserves the right to deduct a processing fee to cover bank charges and administrative costs for Fiat refunds."
                ]
            },
            {
                title: "5. ORDER TYPES AND PROCESS",
                content: [
                    "5.1. Purchasing Service Packages. Freelancers list specific \"Service Packages\" with a fixed scope, price (in Tokens), and delivery timeframe.",
                    "• Scope of Work: By purchasing a Service Package, the Client agrees to the exact scope described in the service listing. Any work outside this description is considered \"Out of Scope.\"",
                    "• Add-ons: Clients may purchase additional features (\"Extras\") at the checkout (e.g., \"Fast Delivery\"). These become part of the binding Order.",
                    "5.2. Custom Briefs & Proposals. If a Client cannot find a suitable Service Package, they may post a \"Custom Brief.\"",
                    "• Process: The Client describes their needs. Vetted Freelancers may submit proposals (bids) with a specific Token price and timeline. An Order is created only when the Client accepts a specific Freelancer’s proposal and the Tokens are deducted into Escrow.",
                    "5.3. Revisions. Unless otherwise stated in the Service Package or Proposal, each Order includes a limited number of revisions. A \"Revision\" is defined as a minor modification to the delivered work. It does not cover a complete redesign or a change in the initial requirements (\"Scope Creep\"). Excessive revisions may require an additional payment of Tokens."
                ]
            },
            {
                title: "6. ESCROW AND ORDER COMPLETION (\"SAFE DEAL\")",
                content: [
                    "To protect both parties, SkillsTrade uses an Escrow system:",
                    "6.1. Initiation. When a Client places an Order, the agreed amount of Tokens is deducted from the Client’s wallet and held in a secure Escrow account by the Platform.",
                    "6.2. Work Phase. The Freelancer performs the work. The Client cannot withdraw these Tokens, and the Freelancer cannot access them yet.",
                    "6.3. Delivery and Acceptance. Once the Freelancer delivers the work, the Client has three (3) days to review it.",
                    "• Approval: If the Client clicks \"Approve,\" Tokens are released to the Freelancer.",
                    "• Auto-Acceptance: If the Client takes no action within three (3) days of delivery, the Order is automatically marked as \"Completed,\" and Tokens are released to the Freelancer.",
                    "6.4. Dispute Resolution. If a Client claims the work was not delivered according to the description, they must open a Dispute ticket before the Auto-Acceptance period ends. SkillsTrade Admin acts as the final arbitrator. We may decide to release the Tokens to the Freelancer, return them to the Client, or split the amount based on the evidence of work performed. This decision is final."
                ]
            },
            {
                title: "7. FREELANCER RELATIONSHIP AND DISCLAIMERS",
                content: [
                    "7.1. Independent Contractor Status. Freelancers are independent contractors running their own businesses. Nothing in these Terms creates an employment, partnership, or agency relationship between RENATASTRADAS MB and any Freelancer. The Company does not control the manner, time, or method in which Freelancers perform their services.",
                    "7.2. Vetted Talent Disclaimer. While SkillsTrade makes commercially reasonable efforts to verify the credentials and portfolios of the Freelancers (\"Vetting\"), we do not guarantee the specific quality, accuracy, or outcome of any work performed. The Client is responsible for selecting the right Freelancer for their needs.",
                    "7.3. Non-Circumvention. You agree not to circumvent the Platform by soliciting, contracting with, or paying any Freelancer listed on our site outside of the SkillsTrade ecosystem for a period of 24 months from your last interaction.",
                    "• Prohibited: Sharing direct email addresses, phone numbers, or handles for external messengers (Telegram, WhatsApp) before an Order is established.",
                    "• Penalty: Violation of this clause may result in immediate account termination and forfeiture of Token balance."
                ]
            },
            {
                title: "8. INTELLECTUAL PROPERTY RIGHTS",
                content: [
                    "8.1. Platform IP. All site design, logos, software, and vetting methodologies are the intellectual property of RENATASTRADAS MB.",
                    "8.2. Ownership of Work Product. Upon full payment of Tokens (release from Escrow) and acceptance of the work, all intellectual property rights in the Deliverables are automatically transferred from the Freelancer to the Client.",
                    "• Exception: If the Client cancels the order and receives a refund, the Client holds no rights to use any drafts or materials delivered by the Freelancer during the cancelled order.",
                    "• Portfolio Use: Unless explicitly agreed otherwise in a Non-Disclosure Agreement (NDA), Freelancers retain the right to display the work in their personal portfolios for promotional purposes."
                ]
            },
            {
                title: "9. CANCELLATION AND REFUNDS (ORDER LEVEL)",
                content: [
                    "9.1. Cancellation by Client.",
                    "• Before Start: If a Client cancels an Order before the Freelancer has accepted it or started work, 100% of the Tokens are returned to the Client’s internal Wallet.",
                    "• During Active Order: Cancellations during active work are subject to mutual agreement. If the Freelancer has already completed part of the work, they may be entitled to partial payment.",
                    "9.2. Cancellation by Freelancer. If a Freelancer cancels an Order due to inability to complete the work, 100% of the Tokens are returned to the Client’s Wallet. Frequent cancellations by a Freelancer may result in loss of \"Vetted\" status."
                ]
            },
            {
                title: "10. LIMITATION OF LIABILITY",
                content: [
                    "10.1. Intermediary Role. To the fullest extent permitted by law, RENATASTRADAS MB shall not be liable for any damages arising from:",
                    "• The acts or omissions of any Freelancer or Client. The quality, safety, or legality of the services provided by Freelancers.",
                    "• Any reliance placed by you on the completeness or accuracy of Freelancer profiles.",
                    "10.2. Maximum Liability. Our total liability for any claim arising out of these Terms is limited to the amount of fees (commissions) actually earned by RENATASTRADAS MB from your transactions in the 6 months preceding the claim."
                ]
            },
            {
                title: "11. GOVERNING LAW AND JURISDICTION",
                content: [
                    "11.1. Governing Law. These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania.",
                    "11.2. Jurisdiction. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Šiauliai, Lithuania."
                ]
            },
            {
                title: "12. CONTACT INFORMATION",
                content: [
                    "If you have questions regarding these Terms, Escrow procedures, or technical support, please contact us:",
                    "RENATASTRADAS MB",
                    "• Address: Šiauliai, Vytauto g. 147-18, LT-76341",
                    "• Email: info@skills-trade.com",
                    "• Phone: +37080000487"
                ]
            }
        ]
    },
    "privacy": {
        title: "Privacy Policy",
        lastUpdated: "February 2, 2026",
        sections: [
            {
                title: "1. INTRODUCTION",
                content: [
                    "RENATASTRADAS MB (“Company”, “we”, “us”, “SkillsTrade”) is committed to protecting your privacy and the personal information you entrust to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal data when you use our marketplace skills-trade.com (the “Platform”).",
                    "We act as the Data Controller for the personal data you provide to us directly regarding your account and billing.",
                    "• Company Name: RENATASTRADAS MB",
                    "• Company Number: 307123019",
                    "• VAT Number: LT100017846812",
                    "• Registered Address: Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania",
                    "• Email: info@skills-trade.com",
                    "By using the Platform, purchasing Tokens, or selling services, you acknowledge the terms of this Policy. This Service is strictly intended for users aged 18 and over."
                ]
            },
            {
                title: "2. DATA WE COLLECT",
                content: [
                    "We collect data necessary to operate a secure marketplace, vet freelancers, process Token payments, and facilitate service delivery.",
                    "2.1. Data You Provide",
                    "• Identity Data: First name, last name, username, and password.",
                    "• Contact Data: Billing address, email address, and telephone number.",
                    "• Professional Data (Freelancers): To maintain our \"Vetted Talent\" status, we collect portfolios, CVs/resumes, skill sets, education history, and links to external professional profiles (e.g., LinkedIn).",
                    "• Verification Data (KYC): Government-issued ID (Passport/ID Card) and proof of address to verify the identity of Freelancers before they can list services.",
                    "• Financial Data: Clients: Payment method details (partial data provided by payment processors), Token purchase history, and Wallet balance. Freelancers: Bank account details (IBAN/SWIFT) or payment method details for withdrawing earnings.",
                    "• User Content: Briefs, project descriptions, file uploads (deliverables), and chat history between Clients and Freelancers.",
                    "2.2. Data Collected Automatically",
                    "• Technical Data: IP address, login data, browser type and version, time zone setting, operating system, and platform.",
                    "• Usage Data: Information about how you use our website, including search queries, page response times, and Token usage patterns.",
                    "• Cookies: Small data files stored on your device to maintain your login session and language preferences."
                ]
            },
            {
                title: "3. HOW WE USE YOUR DATA",
                content: [
                    "We process your personal data under the EU General Data Protection Regulation (GDPR) based on the following legal grounds:",
                    "3.1. Performance of a Contract (Art. 6(1)(b) GDPR)",
                    "• To register you as a new Client or Freelancer.",
                    "• To process Token purchases and manage your internal Wallet balance.",
                    "• To facilitate the Escrow service (holding and releasing funds).",
                    "• To enable communication and file exchange between Client and Freelancer.",
                    "3.2. Legal Obligation (Art. 6(1)(c) GDPR)",
                    "• To verify identities for Anti-Money Laundering (AML) and Know Your Customer (KYC) compliance.",
                    "• To maintain financial records for tax and accounting purposes in Lithuania.",
                    "3.3. Legitimate Interests (Art. 6(1)(f) GDPR)",
                    "• Vetting: To review portfolios and ensure the quality of talent on the Platform.",
                    "• Security: To detect fraud, spam, and unauthorized access.",
                    "• Platform Integrity: To monitor chat messages for keywords related to circumvention (attempts to pay outside the platform) or harassment.",
                    "• Service Improvement: To analyze usage trends and improve our UX/UI.",
                    "3.4. Consent (Art. 6(1)(a) GDPR)",
                    "• We may ask for your consent to send marketing newsletters or display your success story/portfolio in our public marketing materials. You can withdraw this consent at any time."
                ]
            },
            {
                title: "4. SHARING OF PERSONAL DATA",
                content: [
                    "To provide our services, we may share your data with trusted third parties. We require all third parties to respect the security of your personal data and to treat it in accordance with the law.",
                    "1. Counterparties: Freelancers see the Client's username and project brief. Clients see the Freelancer's full professional profile and portfolio.",
                    "2. Payment Processors: We use secure third-party gateways to process Fiat transactions. They process your financial data independently.",
                    "3. Identity Verification Providers: Third-party services used to validate ID documents for Freelancer vetting.",
                    "4. Service Providers: Cloud hosting services (to store uploaded files), email delivery services, and IT support teams.",
                    "5. Legal & Tax Authorities: State Tax Inspectorate (VMI) of Lithuania or other regulators if required by law.",
                    "We do NOT sell your personal data to advertisers."
                ]
            },
            {
                title: "5. INTERNATIONAL DATA TRANSFERS",
                content: [
                    "RENATASTRADAS MB is based in Lithuania (EEA). However, our Clients and Freelancers may be located globally (UK, USA, etc.).",
                    "• Transfer to Third Countries: By using the Platform to communicate with a user outside the EEA, you acknowledge that your project data (briefs, chats) is transferred to that user to fulfill the contract.",
                    "• Service Providers: If we use service providers (e.g., servers) outside the EEA, we ensure protection by using Standard Contractual Clauses (SCCs) approved by the European Commission."
                ]
            },
            {
                title: "6. DATA RETENTION",
                content: [
                    "We retain your personal data only as long as necessary to fulfill the purposes we collected it for:",
                    "• Account Data: Retained while your account is active. If you request deletion, we will erase non-essential data within 30 days.",
                    "• Financial & Transaction Records: Retained for 10 years to comply with Lithuanian tax and accounting laws.",
                    "• Verification Data: Retained for the duration of the Freelancer's activity plus the statutory limitation period for legal claims."
                ]
            },
            {
                title: "7. YOUR LEGAL RIGHTS (GDPR)",
                content: [
                    "Under the GDPR, you have the right to:",
                    "• Access: Request a copy of the personal data we hold about you.",
                    "• Rectification: Request correction of inaccurate data (e.g., updating your portfolio or email).",
                    "• Erasure (Right to be Forgotten): Request deletion of your data (subject to our legal tax obligations).",
                    "• Restriction: Request restriction of processing in certain scenarios.",
                    "• Data Portability: Request transfer of your data to you or another provider.",
                    "• Object: Object to processing based on legitimate interests (e.g., direct marketing).",
                    "To exercise these rights, please contact us at info@skills-trade.com. We may request proof of identity before processing your request."
                ]
            },
            {
                title: "8. DATA SECURITY",
                content: [
                    "We implement robust security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.",
                    "• We use SSL/TLS encryption for all data in transit.",
                    "• Passwords are hashed and salted.",
                    "• Access to sensitive verification data (Passports) is restricted to authorized compliance staff only."
                ]
            },
            {
                title: "9. THIRD-PARTY LINKS",
                content: [
                    "Our website may contain links to third-party websites (e.g., Freelancer’s external portfolio sites). Clicking on those links may allow third parties to collect data about you. We do not control these third-party websites and are not responsible for their privacy statements."
                ]
            },
            {
                title: "10. UPDATES TO THIS POLICY",
                content: [
                    "We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The new version will be posted on this page with an updated \"Effective Date\". Continued use of the Service constitutes acceptance of the updated policy."
                ]
            },
            {
                title: "11. CONTACT US",
                content: [
                    "If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer (DPO) at:",
                    "RENATASTRADAS MB",
                    "• Address: Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania",
                    "• Email: info@skills-trade.com",
                    "• Phone: +37080000487"
                ]
            }
        ]
    },
    "cookies": {
        title: "Cookies Policy",
        lastUpdated: "February 2, 2026",
        sections: [
            {
                title: "1. INTRODUCTION",
                content: [
                    "This Cookies Policy explains how RENATASTRADAS MB (“Company”, “we”, “us”, “SkillsTrade”) uses cookies and similar tracking technologies on our marketplace website skills-trade.com (the “Site”). This policy acts in conjunction with our Privacy Policy.",
                    "Data Controller Details:",
                    "• Company: RENATASTRADAS MB",
                    "• Company Number: 307123019",
                    "• Address: Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania",
                    "• Email: info@skills-trade.com"
                ]
            },
            {
                title: "2. WHAT ARE COOKIES?",
                content: [
                    "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, to secure user accounts, and to provide reporting information.",
                    "We also use similar technologies such as:",
                    "• Local Storage (HTML5): Allows us to store data (like your current Token Balance cache or draft Briefs) locally on your browser so you don't lose them if you accidentally refresh the page.",
                    "• Session Tokens: Temporary identifiers that keep you logged in while you navigate between the \"Talent\" search and your private \"Dashboard\"."
                ]
            },
            {
                title: "3. HOW WE USE COOKIES",
                content: [
                    "We use cookies to facilitate your access to the marketplace, manage the Token payment system, maintain the security of the Escrow process, and ensure that your chat messages are delivered in real-time.",
                    "We categorize cookies as follows:",
                    "3.1. Strictly Necessary Cookies (Essential). These are vital for the Site to function. Without them, we cannot provide the core services, such as: Logging into your secure Client or Freelancer Dashboard, Processing Token purchases via Visa/Mastercard, Ensuring the security of the Escrow transaction mechanism.",
                    "Consent: We do not require your consent for these cookies as the site cannot function without them.",
                    "3.2. Functional Cookies. These allow the Site to remember choices you make to provide a more personalized experience. Examples: Remembering your preferred currency (EUR, GBP, or USD), your interface language, or keeping your search filters active while you browse profiles.",
                    "3.3. Analytics & Performance Cookies. These help us understand how users interact with our Site (e.g., which Service Categories are most popular). We use this data to fix errors and improve platform speed.",
                    "Legal Basis: We request explicit consent via our Cookie Banner before setting these cookies.",
                    "3.4. Marketing & Targeting Cookies. These cookies record your visit to our Site, the pages you have visited, and the links you have followed. We may use this information to display relevant ads to you on other platforms."
                ]
            },
            {
                title: "4. EXAMPLES OF COOKIES WE USE",
                content: [
                    "Below is a non-exhaustive list of the types of storage keys we typically use on SkillsTrade:",
                    "• skillstrade_session: Identifies your active session so you stay logged in to the Dashboard. Lifetime: Session.",
                    "• XSRF-TOKEN: Prevents Cross-Site Request Forgery attacks (security). Lifetime: Session.",
                    "• currency_pref: Remembers if you selected EUR, GBP, or USD prices. Lifetime: 30 Days.",
                    "• chat_status: Remembers your \"Online/Offline\" status preference. Lifetime: Session.",
                    "• token_cart_cache: Stores your selected Token Package in the cart before checkout. Lifetime: Local Storage.",
                    "• _ga, _gid: Google Analytics cookies to measure site traffic. Lifetime: 2 Years / 24 Hours.",
                    "• cookie_consent: Stores your preference regarding this Cookie Policy. Lifetime: 12 Months."
                ]
            },
            {
                title: "5. THIRD-PARTY COOKIES",
                content: [
                    "Please note that trusted third parties may also set cookies on your device. We do not control the dissemination of these cookies.",
                    "1. Payment Processors: When you buy Tokens, our payment gateways set cookies to detect fraud and securely authorize the transaction.",
                    "2. Analytics Providers: We use services like Google Analytics (GA4) to track aggregate user behavior.",
                    "3. Verification Services: Our KYC provider may set cookies during the Freelancer verification process."
                ]
            },
            {
                title: "6. MANAGING YOUR PREFERENCES",
                content: [
                    "You have the right to choose whether or not to accept non-essential cookies.",
                    "• Cookie Banner: When you first visit skills-trade.com, a banner will appear asking for your consent.",
                    "• Browser Settings: You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies.",
                    "Warning: If you use your browser settings to block all cookies (including Strictly Necessary ones), you may not be able to access your Dashboard, purchase Tokens, or chat with Freelancers."
                ]
            },
            {
                title: "7. INTERNATIONAL TRANSFERS",
                content: [
                    "As a global marketplace, some of our third-party partners may process data outside the European Economic Area (EEA). In such cases, we ensure appropriate safeguards are in place in compliance with the GDPR."
                ]
            },
            {
                title: "8. CHANGES TO THIS POLICY",
                content: [
                    "We may update this Cookies Policy from time to time. Any changes will be posted on this page with an updated \"Effective Date\"."
                ]
            },
            {
                title: "9. CONTACT US",
                content: [
                    "If you have any questions about how we use cookies, please contact us:",
                    "RENATASTRADAS MB",
                    "• Email: info@skills-trade.com",
                    "• Address: Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania"
                ]
            }
        ]
    },
    "refund": {
        title: "Refund and Return Policy",
        lastUpdated: "February 2, 2026",
        sections: [
            {
                title: "1. INTRODUCTION",
                content: [
                    "This Refund and Return Policy (“Policy”) governs the cancellation of Orders, requests for refunds of Token packages, and the resolution of disputes regarding services provided via SkillsTrade.",
                    "This Policy constitutes a legally binding agreement between RENATASTRADAS MB (Company Number: 307123019), a company registered in Lithuania (“Company”, “we”, “us”), and you (“User”, “Client”).",
                    "By purchasing Tokens or funding an Escrow transaction on skills-trade.com, you agree to the terms outlined below. This Policy operates in conjunction with our Terms and Conditions."
                ]
            },
            {
                title: "2. REFUND OF TOKEN PACKAGES (FIAT REFUNDS)",
                content: [
                    "Tokens are the internal utility currency used to hire Vetted Talent on the Platform. The refund of real currency (EUR, GBP, USD) for Token purchases is subject to strict conditions to comply with anti-money laundering (AML) regulations and digital content laws.",
                    "2.1. Eligibility for Fiat Refund. You may request a full refund for a purchased Token Package within 14 days of the original transaction date, provided that: 100% Unused, No Disputes.",
                    "2.2. Non-Refundable Scenarios. Partial Use: If you have used any portion of a Token package, the remaining balance is non-refundable to your bank account. Expired Period: Requests made after 14 days from the purchase date are not eligible for a Fiat refund.",
                    "2.3. Processing Fee. For all eligible monetary refunds, we reserve the right to deduct a processing fee of 5% (or a minimum of €10.00) to cover merchant gateway fees and administrative costs."
                ]
            },
            {
                title: "3. CANCELLATION OF ORDERS (TOKEN REVERSALS)",
                content: [
                    "This section governs the return of Tokens to your internal SkillsTrade Wallet, not the return of money to your bank account. This occurs when an Order with a Freelancer is cancelled or disputed.",
                    "3.1. Cancellation Before Work Begins. If a Client cancels an Order before the Freelancer has accepted the request or started work: Result: 100% of the frozen Tokens are immediately returned to the Client’s Wallet. Fee: No penalty fee applies.",
                    "3.2. Cancellation During Active Work. If an Order is active, cancellation requires mutual agreement: Freelancer Agrees: Tokens are returned to the Client’s Wallet. Freelancer Refuses: The Client must initiate a Dispute."
                ]
            },
            {
                title: "4. ACCEPTANCE AND AUTO-COMPLETION",
                content: [
                    "4.1. The 3-Day Review Period. Upon delivery of the final work, the Client has three (3) calendar days to review the files. During this period, the Client may: Accept, Request Revision, or Open Dispute.",
                    "4.2. Auto-Acceptance. If the Client takes no action within the 3-day review period, the Order is automatically marked as \"Completed.\" Consequence: Tokens are released to the Freelancer’s wallet. No Returns: Once funds are released from Escrow, they cannot be reversed or refunded."
                ]
            },
            {
                title: "5. DISPUTE RESOLUTION AND QUALITY CLAIMS",
                content: [
                    "Unlike standard digital goods, services are subjective. SkillsTrade acts as a neutral arbitrator for quality disputes.",
                    "5.1. Grounds for Dispute. A Client may request a return of Tokens if: Non-Delivery, Not as Described, or Technical Failure.",
                    "5.2. Subjective Quality. \"Style preference\" is not a valid ground for a refund.",
                    "5.3. Admin Decision. If a Dispute is escalated to SkillsTrade Support: Outcome A (Full Refund), Outcome B (Partial Refund), or Outcome C (Release to Freelancer). The decision of RENATASTRADAS MB is final and binding."
                ]
            },
            {
                title: "6. METHOD OF REFUND",
                content: [
                    "6.1. Fiat Refunds. Where a monetary refund is approved, it will be processed strictly to the original payment method. Refunds typically take 5–10 business days.",
                    "6.2. Token Refunds. Where an Order refund is approved, Tokens are credited instantly to the User’s Account Balance.",
                    "6.3. Currency Exchange Risks. We process transactions in EUR, GBP, and USD. We refund the exact amount charged in the transaction currency. We are not liable for differences caused by exchange rate fluctuations."
                ]
            },
            {
                title: "7. CHARGEBACKS AND FRAUD",
                content: [
                    "If you initiate a payment dispute (Chargeback) with your bank without first contacting our support team: Your Account will be suspended immediately. We will submit evidence that digital tokens were delivered and/or services were rendered. We reserve the right to ban your IP address."
                ]
            },
            {
                title: "8. CONTACT INFORMATION",
                content: [
                    "To request a refund or open a dispute, please use the \"Report\" button in your Order Dashboard or contact us at:",
                    "RENATASTRADAS MB",
                    "• Email: info@skills-trade.com",
                    "• Address: Šiauliai, Vytauto g. 147-18, LT-76341",
                    "• Phone: +37080000487"
                ]
            }
        ]
    }
};
