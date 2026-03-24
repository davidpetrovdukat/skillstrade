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
        lastUpdated: "March 19, 2026",
        sections: [
            {
                title: "Introduction",
                content: [
                    "These Terms and Conditions (“Terms”) govern your access to and use of the Skills-Trade platform available at skills-trade.com and any related services, features, dashboards, content, communications, and transactions made available through the platform (collectively, the “Platform”).",
                    "By accessing or using the Platform, creating an account, purchasing Tokens, submitting a brief, ordering services, or otherwise interacting with Skills-Trade, you agree to be bound by these Terms. If you do not agree, you must not use the Platform."
                ]
            },
            {
                title: "1. Who We Are",
                content: [
                    "The Platform is owned and operated by RENATASTRADAS MB (“Skills-Trade”, “Company”, “we”, “us”, or “our”), a company registered in Lithuania.",
                    "Company details: RENATASTRADAS MB. Company No.: 307123019. VAT No.: LT100017846812. Registered address: Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania. Email: info@skills-trade.com. Phone: +370 66806166."
                ]
            },
            {
                title: "2. Nature of the Platform",
                content: [
                    "Skills-Trade is an online platform that connects: businesses and individual customers seeking creative, technical, strategic, or other professional services (“Clients”); and independent professionals who may provide such services through the Platform after review and approval by Skills-Trade (“Freelancers”).",
                    "Skills-Trade operates as a marketplace, workflow platform, and payment facilitation layer for Orders placed on the Platform. Unless expressly stated otherwise, Skills-Trade is not the employer, partner, agent, representative, or joint venture partner of any Freelancer or Client.",
                    "Freelancers are independent contractors and are solely responsible for the services they provide, their statements, qualifications, taxes, compliance obligations, and business operations."
                ]
            },
            {
                title: "3. Eligibility",
                content: [
                    "You may use the Platform only if: you are at least 18 years old; you have legal capacity to enter into binding contracts; your use of the Platform does not violate any applicable law or regulation; and any information you provide to us is complete, accurate, and not misleading.",
                    "If you use the Platform on behalf of a company, agency, or other legal entity, you represent and warrant that you have authority to bind that entity to these Terms.",
                    "The Platform may be used by both business customers (B2B) and individual consumers (B2C).",
                    "We do not offer the Platform or related services to any person or entity located in, resident in, organized in, or ordinarily operating from any prohibited or restricted jurisdiction designated by us for legal, sanctions, export-control, compliance, fraud, or risk reasons. As of March 19, 2026, prohibited jurisdictions include: Darfur (Sudan), Democratic Republic of the Congo, Iran, Mali, Myanmar (Burma), North Korea, South Sudan, Syria, Yemen, Afghanistan, Belarus, Central African Republic, Cuba, Haiti, Iraq, Russia, Somalia, Venezuela, and Zimbabwe. We may reject registrations, block transactions, suspend access, request enhanced verification, or terminate accounts where we reasonably believe a user is connected to a prohibited jurisdiction or restricted party."
                ]
            },
            {
                title: "4. Accounts",
                content: [
                    "4.1 Client accounts. Clients may register an account directly through the Platform using the registration methods made available by Skills-Trade, including email/password and any supported third-party login method. You must keep your login details confidential and must not share your account with any other person. You are responsible for all activities that occur under your account, including Orders, messages, approvals, disputes, payment activity, and any actions taken through your dashboard.",
                    "4.2 Freelancer onboarding. Freelancers do not automatically obtain seller access by simple account registration. Any person wishing to provide services through the Platform must complete the relevant application or onboarding form and may be reviewed by Skills-Trade before being approved. Submission of an application does not guarantee approval.",
                    "4.3 Account verification and review. We may request documents, portfolio samples, identity details, business information, or other supporting materials at any time to verify account ownership, identity, expertise, or legitimacy of activity on the Platform.",
                    "4.4 Refusal of registration or onboarding. We may refuse registration, deny Freelancer approval, or restrict account functionality where reasonably necessary, including where: the provided information is inaccurate, incomplete, inconsistent, or appears misleading; we cannot verify identity, business details, or account ownership; we are not satisfied with the claimed skills, experience, portfolio quality, or professional reliability of a Freelancer applicant; we suspect fraud, impersonation, chargeback abuse, sanctions risk, unlawful conduct, or misuse of the Platform; the applicant or user has breached these Terms or any related policy before; the proposed services, content, or conduct are incompatible with the Platform’s standards, commercial model, or risk controls."
                ]
            },
            {
                title: "5. Account Security",
                content: [
                    "You are responsible for maintaining the security of your account, credentials, devices, and email access. You must notify us promptly at info@skills-trade.com if you suspect unauthorized access or misuse.",
                    "We are not responsible for losses caused by: your failure to secure your login credentials or email account; your sharing of access with third parties; phishing, social engineering, device compromise, or other issues outside our reasonable control."
                ]
            },
            {
                title: "6. Token System",
                content: [
                    "6.1 Platform currency. The Platform uses an internal digital wallet and token system. Tokens are the internal unit used to pay for services available on the Platform. Base conversion rate: 1 EUR = 100 TKN. This means, unless stated otherwise in a specific package or promotion, each euro paid converts into 100 platform tokens.",
                    "6.2 Token packages and bonuses. Skills-Trade may offer different Token packages, including packages with promotional or bonus tokens. For example: a package may include standard purchased tokens; and an additional promotional amount of bonus tokens. Bonus tokens are promotional only, have no separate cash value, and are subject to these Terms and any package-specific conditions.",
                    "6.3 Tokens are not financial assets. Tokens: are not cryptocurrency; are not legal tender; are not bank deposits; are not e-money; are not securities, investment products, or stored-value instruments; do not generate interest; cannot be traded, transferred outside the Platform, pledged, or redeemed except as expressly permitted under these Terms. Tokens are a limited contractual right to use eligible Platform services.",
                    "6.4 Token expiry. Purchased tokens do not expire. Bonus tokens also do not expire unless a specific promotional campaign expressly states otherwise.",
                    "6.5 Changes to packages and pricing. We may change Token package structure, bonus mechanics, pricing, package names, promotional terms, and checkout presentation at any time for future purchases. Such changes do not retroactively alter tokens already credited to your account, except where required to correct a manifest technical error or comply with law."
                ]
            },
            {
                title: "7. Payments",
                content: [
                    "7.1 Accepted payment methods. Token purchases are currently processed only by Visa and Mastercard. We may add, remove, suspend, or limit payment methods at any time.",
                    "7.2 Payment authorization. By purchasing Tokens, you authorize us and our payment processors to charge your selected payment method for the displayed amount, including any applicable taxes or fees shown at checkout.",
                    "7.3 Payment review. We may delay, reject, reverse, or hold a purchase where reasonably necessary for fraud screening, payment verification, compliance review, technical validation, or risk management. If a payment fails, is reversed, or is not successfully captured, we may decline to credit Tokens or may remove any Tokens credited in error."
                ]
            },
            {
                title: "8. Refunds of Token Purchases",
                content: [
                    "8.1 Unused purchased tokens. A Client may request a refund of unused purchased tokens to the original payment method, provided that: the request is made within 14 days of the relevant purchase; and those purchased tokens have not been spent, committed to an active Order, reserved in escrow, or otherwise used.",
                    "8.2 Bonus tokens. Bonus tokens are non-refundable and are excluded from fiat refunds. Where a package included both purchased tokens and bonus tokens, any approved refund will be calculated only by reference to the refundable purchased portion, and bonus tokens may be removed, cancelled, or disregarded for refund purposes.",
                    "8.3 Refund fee. Where a user is legally entitled to a refund during the 14-day cooling-off period for an entirely unused Token purchase, Skills-Trade will not deduct a processing or administration fee from that refund. Any separate deduction or charge will apply only where permitted by mandatory law, clearly disclosed in advance, and justified by costs that may lawfully be passed on.",
                    "8.4 Original payment method only. Any fiat refund, if approved, will be returned only to the original payment method used for the purchase, unless otherwise required by law.",
                    "8.5 No refund in certain cases. We may refuse a fiat refund request where: the relevant purchased tokens were used in whole or in part; the refund request is late; the purchase is linked to fraud, abuse, chargeback activity, policy evasion, or suspicious conduct; we are required to withhold or refuse refund for legal, payment, or compliance reasons."
                ]
            },
            {
                title: "9. Orders, Services, and Delivery",
                content: [
                    "9.1 Order types. Clients may obtain services through the Platform by: purchasing a listed fixed-price service package; or submitting a custom brief and proceeding with an approved scope or offer through the Platform. Each confirmed Order will reflect the applicable scope, price in Tokens, and expected delivery parameters.",
                    "9.2 Scope of service. The binding scope of an Order is determined by the service listing, package description, custom brief, approved offer, dashboard order details, and any written clarifications accepted through the Platform. Anything outside the agreed scope is considered out of scope and may require a new Order, extra Tokens, or a revised agreement.",
                    "9.3 Delivery method. Services, files, outputs, deliverables, or other Order results are delivered to the Client through: the Client’s dashboard on the Platform; and/or the email address linked to the Client’s registered account. Skills-Trade may use one or both of these delivery channels depending on the workflow, file type, project structure, technical limitations, or operational process.",
                    "9.4 When an Order is considered delivered. An Order is considered delivered when the relevant work result is made available to the Client and the Order status on the Platform reflects completion workflow, including where the Order appears in the Client dashboard as Completed. For operational clarity: delivery may first occur when the work result is uploaded, shared, or issued through the Platform workflow; and the Order is treated as fully completed for payment release purposes when it is marked Completed in the dashboard, whether by approval, dispute outcome, or automatic completion under these Terms.",
                    "9.5 Review period. After delivery, the Client has three (3) calendar days to review the delivered work and take one of the following actions through the Platform: accept the work; request changes that fall within the agreed scope, where applicable; or open a dispute before the review period ends.",
                    "9.6 Automatic completion. If the Client takes no valid action during the review period, the Order may be automatically marked Completed, and the corresponding Tokens may be released to the Freelancer.",
                    "9.7 Delivery by email and dashboard. The Client is responsible for monitoring both: the registered account dashboard; and the registered email inbox, including spam/junk folders where relevant. Failure to review or respond because the Client did not check their dashboard or registered email does not prevent completion or auto-completion of an Order."
                ]
            },
            {
                title: "10. Revisions and Scope Changes",
                content: [
                    "Where revisions are included in the relevant package, offer, or Order details, such revisions are limited to adjustments that remain within the originally agreed scope. A revision does not include: a new concept; a materially different direction; a rewrite or redesign of the whole work; new deliverables not originally ordered; major changes caused by a change in the Client’s brief, business decision, or preferences after work began.",
                    "Any request outside the original scope may be treated as an additional service requiring extra Tokens, a revised timeline, or a new Order. If a package or Order does not specify a revision count, Skills-Trade and/or the responsible Freelancer may determine, acting reasonably, whether a requested change is an in-scope correction or an out-of-scope change."
                ]
            },
            {
                title: "11. Escrow and Release of Tokens",
                content: [
                    "11.1 Escrow holding. When a Client places an Order, the relevant Tokens may be deducted from the Client’s wallet and held within the Platform’s internal escrow workflow until the Order is completed, cancelled, or otherwise resolved.",
                    "11.2 Release. Tokens held for an Order may be released to the Freelancer when: the Client accepts the work; the Order is automatically completed after the review period; or a dispute is resolved in favor of full or partial release.",
                    "11.3 Completion after termination. If an account is terminated or suspended while an Order is active, Skills-Trade may permit the Order to be completed and may release the corresponding Tokens in accordance with the actual work status, dispute outcome, or reasonable internal assessment."
                ]
            },
            {
                title: "12. Manager Intervention and Order Problems",
                content: [
                    "If a Freelancer misses a deadline, stops responding, delivers incomplete work, or if a Client becomes unresponsive or otherwise disrupts the Order flow, Skills-Trade may intervene through a manager, support representative, moderation team, or legal/compliance representative, as applicable.",
                    "We may take one or more of the following actions: request clarification or additional evidence from either party; extend timelines; pause the Order; facilitate a practical solution; determine whether work has been sufficiently delivered; issue a full or partial Token return to the Client; release full or partial Tokens to the Freelancer; cancel the Order where appropriate.",
                    "Our decision on Platform-level order administration and disputes will be based on the materials available to us and may include dashboard history, communications, file submissions, timestamps, scope details, and conduct of the parties."
                ]
            },
            {
                title: "13. Intellectual Property",
                content: [
                    "13.1 Platform IP. The Platform itself, including its software, branding, design, layout, text, databases, workflows, graphics, and related materials, belongs to Skills-Trade or its licensors and is protected by intellectual property laws. You may not copy, scrape, reproduce, republish, reverse engineer, decompile, distribute, or exploit any part of the Platform except as permitted by law or by our prior written consent.",
                    "13.2 Client ownership of delivered work. Subject to full payment for the relevant Order, the Client receives ownership of the final deliverables produced for that Order when the Client receives the completed Order through the Platform workflow. For practical purposes under the Platform, this means ownership transfers once the Order has been duly completed and paid through the Platform.",
                    "13.3 Exclusions and third-party rights. The transfer described above applies to the final deliverables created for the Client under the relevant Order, but does not automatically include: rights in the Platform itself; pre-existing tools, methods, know-how, libraries, frameworks, templates, or general skills used by the Freelancer; open-source components subject to their own licenses; third-party fonts, stock assets, plugins, integrations, software, datasets, or other materials that are subject to separate license terms; any materials that the Freelancer or Client had before the Order began. To the extent any third-party or background elements are embedded in the deliverables, such elements remain subject to their own applicable terms and limitations.",
                    "13.4 No rights if unpaid or refunded. If an Order is cancelled, reversed, refunded, or not fully paid through the Platform, the Client does not obtain the right to use draft materials, partial work, concepts, or deliverables associated with that Order unless expressly agreed otherwise in writing.",
                    "13.5 No public portfolio display. Work completed through the Platform is not intended for public Freelancer portfolio display through the Platform workflow unless explicitly authorized in writing by Skills-Trade and the relevant Client. As a default rule for Skills-Trade transactions, such work is treated as non-public."
                ]
            },
            {
                title: "14. User Conduct Rules",
                content: [
                    "You must use the Platform lawfully, honestly, and in good faith. You must not: provide false, misleading, or incomplete information; impersonate another person or entity; create duplicate, deceptive, or unauthorized accounts; attempt to bypass onboarding, vetting, payment, or moderation controls; arrange or encourage off-platform payment, side deals, or direct contracting that circumvents Skills-Trade; share contact details or attempt to move a transaction outside the Platform for the purpose of avoiding fees, controls, or review; upload unlawful, infringing, abusive, defamatory, harmful, deceptive, or fraudulent content; infringe intellectual property, privacy, or confidentiality rights; misuse disputes, approvals, revisions, or chargebacks; harass, threaten, abuse, or intimidate other users or staff; use bots, scraping tools, automated extraction, or other technical means to harvest data or interfere with the Platform; upload malware, malicious code, or harmful files; resell, lease, transfer, or unlawfully use another account; engage in spam, manipulation, review abuse, traffic fraud, or fake activity."
                ]
            },
            {
                title: "15. Non-Circumvention and Off-Platform Dealing",
                content: [
                    "To protect the Platform and its business model, you must not circumvent Skills-Trade by taking business, payment, or service delivery outside the Platform with users you met through Skills-Trade. This includes: requesting or sharing direct payment details to complete work outside the Platform; moving negotiations or service performance off-platform to avoid Tokens, fees, review controls, or dispute handling; using information obtained through the Platform to contract directly with another user outside the Platform. We may suspend or terminate accounts, cancel Orders, remove balances, or take other protective measures where we reasonably believe circumvention has occurred."
                ]
            },
            {
                title: "16. Chargebacks, Payment Reversals, and Fraud",
                content: [
                    "If you initiate a chargeback, reversal, payment dispute, or similar recovery attempt through your bank or card issuer without first seeking resolution through the Platform, we may: suspend or restrict your account; freeze or remove associated Tokens or balances; contest the chargeback using available evidence; recover associated losses, fees, and administrative costs from you where permitted by law; permanently terminate your account.",
                    "Where a chargeback relates to Tokens already used for Orders or services already delivered, you remain liable for the full value of the relevant transaction and any related costs, losses, processor penalties, and collection expenses incurred by Skills-Trade. We also reserve the right to report suspected fraud, payment abuse, stolen payment instrument use, or unlawful conduct to payment processors, banks, authorities, or relevant third parties where appropriate."
                ]
            },
            {
                title: "17. Suspension and Termination",
                content: [
                    "17.1 Our rights. We may suspend, restrict, or terminate any account, listing, Order access, wallet functionality, or Platform access at any time where reasonably necessary to: enforce these Terms; protect other users, the Platform, or payment systems; investigate fraud, abuse, unlawful conduct, or policy breaches; comply with legal obligations, sanctions, court orders, or regulatory requirements; respond to security, technical, or reputational risks.",
                    "17.2 Your right to request account closure. You may request closure of your account at any time by submitting the contact form with the subject line \"General Support\" or by contacting info@skills-trade.com from the email address associated with your account. We may request reasonable information to verify your identity and to confirm the request before processing it.",
                    "17.3 Processing of closure requests. After verification, we will review the account for open Orders, outstanding disputes, unpaid fees, compliance holds, chargeback exposure, fraud indicators, record-retention obligations, and any other legal or operational requirement that must be resolved before closure. We may close the account immediately, place it into a restricted state while matters are completed, or refuse closure where we are legally required to keep the account active for investigation or compliance purposes.",
                    "17.4 Effect on active Orders. Where reasonably possible, active Orders may be allowed to proceed to resolution or completion even if one party's account is restricted, scheduled for closure, or terminated.",
                    "17.5 Effect on Tokens and payouts. Where an active Order is completed, the related Tokens may still be released to the Freelancer for work properly performed. Pending payouts properly earned by Freelancers may still be processed, subject to fraud review, dispute status, payment risk checks, and compliance requirements. Unused balances, if any, will be handled in accordance with the refund rules, payment-processor requirements, and applicable law.",
                    "17.6 Access to completed work and retained records. Following termination, completed work and order records may remain accessible through the delivery channels previously used for the transaction, including the Client's registered email. We do not guarantee indefinite dashboard hosting or permanent storage of files or order history. We may also retain records after closure where required for tax, accounting, dispute, AML/KYC, sanctions, security, or other legal compliance reasons.",
                    "17.7 No compensation. We are not liable to you for suspension, restriction, closure processing, or termination taken in good faith under these Terms."
                ]
            },
            {
                title: "18. Disputes Between Users",
                content: [
                    "18.1 Internal handling. If a dispute arises regarding delivery, scope, quality, completion, delay, communication failure, or payment release, the matter should first be raised through the Platform’s dispute or support process.",
                    "18.2 Review and decision. Skills-Trade may review available evidence and make a Platform-level decision through its support, management, moderation, legal, or compliance function. We may decide, at our discretion acting reasonably, to: reject the claim; return all Tokens to the Client; return part of the Tokens to the Client; release all Tokens to the Freelancer; or split the Tokens between the parties.",
                    "18.3 Finality within the Platform. To the maximum extent permitted by law, Skills-Trade’s internal decision regarding the Platform handling of escrowed Tokens, Order status, and account measures is final for purposes of Platform administration. Nothing in this clause removes any non-waivable legal rights a consumer may have under applicable law."
                ]
            },
            {
                title: "19. Consumer Notice",
                content: [
                    "If you are a consumer, mandatory consumer rights that cannot legally be excluded will continue to apply. Where digital services begin immediately or Tokens are credited promptly after purchase at your request, your rights to cancel or withdraw may be limited to the extent permitted by applicable law once performance has begun, content has been supplied, or the purchased digital functionality has been used. Nothing in these Terms excludes rights that cannot lawfully be excluded."
                ]
            },
            {
                title: "20. Disclaimers",
                content: [
                    "The Platform is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, Skills-Trade does not guarantee that: the Platform will be uninterrupted, error-free, secure, or always available; any Freelancer will be suitable for your needs; any service will achieve a particular business, creative, technical, or commercial result; files, communications, dashboards, or email delivery will always be free from delay, corruption, or third-party failure. We do not guarantee the legality, accuracy, quality, commercial value, fitness, or outcomes of services provided by independent Freelancers."
                ]
            },
            {
                title: "21. Limitation of Liability",
                content: [
                    "To the fullest extent permitted by law: Skills-Trade shall not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages; Skills-Trade shall not be liable for loss of profit, revenue, business, contracts, goodwill, data, anticipated savings, business opportunities, or reputation; Skills-Trade shall not be liable for acts, omissions, fraud, negligence, misconduct, or contractual failures of Clients, Freelancers, payment processors, email providers, hosting providers, third-party software, or other third parties; Skills-Trade shall not be liable for delays, interruptions, security incidents, data loss, system failures, or technical errors beyond our reasonable control.",
                    "To the fullest extent permitted by law, Skills-Trade’s total aggregate liability arising out of or in connection with the Platform or these Terms shall not exceed the total amount of Platform fees or commissions actually retained by Skills-Trade from the specific user giving rise to the claim during the six (6) months immediately preceding the event giving rise to liability. If applicable law does not permit some of the exclusions or limitations above, they shall apply only to the maximum extent permitted."
                ]
            },
            {
                title: "22. Indemnity",
                content: [
                    "You agree to defend, indemnify, and hold harmless Skills-Trade, RENATASTRADAS MB, its directors, officers, employees, contractors, advisors, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses, including reasonable legal fees, arising out of or related to: your use of the Platform; your breach of these Terms; your violation of law; your infringement of intellectual property, privacy, confidentiality, or other rights; your dispute with another user; your fraud, negligence, abuse, or misconduct."
                ]
            },
            {
                title: "23. Changes to These Terms",
                content: [
                    "We may update or modify these Terms from time to time. Where we make material changes, we may publish the updated version on the Platform and may also provide notice by dashboard notice, email, or other reasonable means. Unless a different effective date is stated, the updated Terms take effect when published on the Platform. Your continued use of the Platform after the effective date of updated Terms constitutes acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the Platform."
                ]
            },
            {
                title: "24. Governing Law and Jurisdiction",
                content: [
                    "These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by the laws of the Republic of Lithuania. Subject to any mandatory rights under applicable consumer law, the courts of Lithuania shall have exclusive jurisdiction over disputes arising out of or in connection with these Terms, and venue may be brought in the competent courts of Šiauliai, Lithuania where applicable."
                ]
            },
            {
                title: "25. Notices and Contact",
                content: [
                    "All legal notices, complaints, support requests, and communications relating to these Terms should be sent to: info@skills-trade.com or by post to: RENATASTRADAS MB, Šiauliai, Vytauto g. 147-18, LT-76341, Lithuania."
                ]
            },
            {
                title: "26. Miscellaneous",
                content: [
                    "If any provision of these Terms is found to be unlawful, invalid, or unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any provision does not waive our right to enforce it later. You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign or transfer our rights and obligations under these Terms where reasonably necessary in connection with business restructuring, sale, merger, or operational reorganization. These Terms, together with any policies expressly incorporated into them, constitute the entire agreement between you and Skills-Trade regarding the Platform."
                ]
            }
        ]
    },
    "privacy": {
        title: "Privacy Policy",
        lastUpdated: "March 19, 2026",
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
                    "• Payment Card Handling: We do not store full payment card numbers, CVV/CVC codes, or full card authentication data on our own servers. Card payments are processed by PCI-DSS-compliant third-party payment gateways and processors, which handle full card data directly under their own security and compliance obligations.",
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
                    "2. Payment Processors: We use PCI-DSS-compliant third-party gateways to process Fiat transactions. They process your financial data independently and are responsible for the secure handling of full payment card data entered into their systems.",
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
                    "• Phone: +37066806166"
                ]
            }
        ]
    },
    "cookies": {
        title: "Cookie Policy",
        lastUpdated: "March 19, 2026",
        sections: [
            {
                title: "1. INTRODUCTION",
                content: [
                    "This Cookie Policy explains how RENATASTRADAS MB (“Company”, “we”, “us”, “SkillsTrade”) uses cookies and similar tracking technologies on our marketplace website skills-trade.com (the “Site”). This policy acts in conjunction with our Privacy Policy.",
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
                    "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated \"Effective Date\"."
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
        lastUpdated: "March 19, 2026",
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
                    "2.3. Processing Fee. If you qualify for a refund within the 14-day cooling-off period and the Token Package is entirely unused, we will not deduct any processing or administration fee from that refund. Any deduction outside that scenario will apply only where permitted by mandatory law and clearly disclosed in advance."
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
                    "• Phone: +37066806166"
                ]
            }
        ]
    }
};
