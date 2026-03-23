import type { IOrderServiceSnapshot } from '@/models/Order';

export interface ServicePromptConfig {
    promptKey: string;
    documentType: string;
    objective: string;
    tone: string;
    requiredSectionHeadings: string[];
    mustInclude: string[];
}

const SERVICE_PROMPT_CONFIGS: Record<string, ServicePromptConfig> = {
    'Strategic Brand Identity Suite': {
        promptKey: 'strategic-brand-identity-suite',
        documentType: 'Brand Strategy and Identity Blueprint',
        objective: 'Turn the client brief into a clear brand direction, identity rationale, and rollout-ready brand system document.',
        tone: 'strategic, creative, commercially sharp',
        requiredSectionHeadings: ['Brand Direction', 'Audience and Positioning', 'Visual Identity System', 'Application Guidance'],
        mustInclude: ['brand positioning', 'voice and tone direction', 'visual identity rationale', 'implementation recommendations'],
    },
    'Scalable SaaS Design System': {
        promptKey: 'scalable-saas-design-system',
        documentType: 'SaaS Design System Specification',
        objective: 'Produce a product design system specification that a SaaS product team can use to align product design, UX consistency, and implementation priorities.',
        tone: 'product-led, systematic, precise',
        requiredSectionHeadings: ['Product Context', 'Core UX Principles', 'Component System', 'Implementation Priorities'],
        mustInclude: ['layout logic', 'states and interactions', 'design token guidance', 'handoff recommendations'],
    },
    'Cinematic 3D Product Animation': {
        promptKey: 'cinematic-3d-product-animation',
        documentType: '3D Animation Creative Production Brief',
        objective: 'Translate the brief into a cinematic animation plan covering story, style, shots, motion, and production assumptions.',
        tone: 'visual, cinematic, production-aware',
        requiredSectionHeadings: ['Creative Direction', 'Narrative and Shot Plan', 'Visual and Motion Language', 'Production Notes'],
        mustInclude: ['scene progression', 'camera language', 'lighting or material direction', 'asset requirements'],
    },
    'Photorealistic Product Visualization': {
        promptKey: 'photorealistic-product-visualization',
        documentType: 'Product Visualization Art Direction Pack',
        objective: 'Create a realistic visualization brief covering rendering goals, scene setup, material treatment, and delivery expectations.',
        tone: 'detailed, premium, art-directed',
        requiredSectionHeadings: ['Visualization Goals', 'Scene and Composition', 'Material and Lighting Direction', 'Output Plan'],
        mustInclude: ['composition guidance', 'lighting notes', 'material realism notes', 'export expectations'],
    },
    'Series A Investment Pitch Deck': {
        promptKey: 'series-a-investment-pitch-deck',
        documentType: 'Investor Deck Narrative Outline',
        objective: 'Build a persuasive Series A pitch narrative with investor-ready structure, messaging, and slide priorities.',
        tone: 'investor-ready, concise, high-conviction',
        requiredSectionHeadings: ['Fundraising Narrative', 'Market and Opportunity', 'Business and Traction', 'Investor Messaging'],
        mustInclude: ['fundraising story arc', 'traction framing', 'market logic', 'slide-by-slide guidance'],
    },
    'Premium Mobile App UI': {
        promptKey: 'premium-mobile-app-ui',
        documentType: 'Mobile App UX and UI Direction Document',
        objective: 'Produce a mobile product design document that turns the brief into user flows, screen priorities, UI direction, and interaction guidance.',
        tone: 'modern, user-centered, practical',
        requiredSectionHeadings: ['Product Goals', 'User Flow Priorities', 'Interface Direction', 'Delivery Scope'],
        mustInclude: ['screen hierarchy', 'UX priorities', 'visual style direction', 'handoff recommendations'],
    },
    'Custom Webflow Development': {
        promptKey: 'custom-webflow-development',
        documentType: 'Webflow Build Implementation Plan',
        objective: 'Create a structured Webflow implementation brief with content structure, CMS needs, interactions, and QA requirements.',
        tone: 'technical, conversion-aware, organized',
        requiredSectionHeadings: ['Site Objectives', 'Structure and CMS', 'Interaction and UX Notes', 'Build and QA Plan'],
        mustInclude: ['page structure', 'CMS/data model needs', 'interaction notes', 'launch checklist'],
    },
    'Modern Front-End (Next.js)': {
        promptKey: 'modern-front-end-nextjs',
        documentType: 'Front-End Engineering Delivery Plan',
        objective: 'Turn the brief into a scoped front-end implementation document for a Next.js product build.',
        tone: 'engineering-led, clear, implementation-focused',
        requiredSectionHeadings: ['Project Goals', 'Technical Architecture', 'Feature Scope', 'Delivery and QA'],
        mustInclude: ['component or route planning', 'data flow assumptions', 'performance or SEO notes', 'testing priorities'],
    },
    'Smart Contract Development': {
        promptKey: 'smart-contract-development',
        documentType: 'Smart Contract Delivery Specification',
        objective: 'Produce a smart contract specification covering business logic, risk areas, contract behavior, and delivery boundaries.',
        tone: 'technical, risk-aware, exact',
        requiredSectionHeadings: ['Business Logic Scope', 'Contract Design', 'Security and Risk Notes', 'Testing and Delivery'],
        mustInclude: ['contract responsibilities', 'permission model', 'security considerations', 'deployment or audit notes'],
    },
    'High-Conversion Shopify Store': {
        promptKey: 'high-conversion-shopify-store',
        documentType: 'Shopify Store Launch Blueprint',
        objective: 'Create a Shopify implementation and conversion plan that covers site structure, merchandising, UX, and launch readiness.',
        tone: 'commercial, conversion-focused, actionable',
        requiredSectionHeadings: ['Store Goals', 'Merchandising and Content', 'Conversion UX', 'Launch Plan'],
        mustInclude: ['homepage and product page priorities', 'collections or merchandising logic', 'conversion drivers', 'launch checklist'],
    },
    'Business Automation Scripts': {
        promptKey: 'business-automation-scripts',
        documentType: 'Automation Solution Design Document',
        objective: 'Translate the brief into an automation design document that defines workflows, triggers, outputs, dependencies, and monitoring.',
        tone: 'systems-minded, operational, clear',
        requiredSectionHeadings: ['Automation Goals', 'Workflow Design', 'Inputs and Outputs', 'Operational Safeguards'],
        mustInclude: ['trigger logic', 'data sources', 'failure handling', 'handoff or maintenance notes'],
    },
    'Web Application Penetration Test': {
        promptKey: 'web-application-penetration-test',
        documentType: 'Security Assessment Report Outline',
        objective: 'Produce a penetration testing report structure tailored to the client brief, scope, and risk posture.',
        tone: 'security-professional, direct, evidence-driven',
        requiredSectionHeadings: ['Assessment Scope', 'Threat Priorities', 'Findings Structure', 'Remediation Plan'],
        mustInclude: ['attack surface summary', 'risk framing', 'finding categories', 'remediation priorities'],
    },
    'Deep Technical SEO Audit': {
        promptKey: 'deep-technical-seo-audit',
        documentType: 'Technical SEO Audit Report',
        objective: 'Generate a technical SEO audit document with prioritised findings, root causes, and implementation next steps.',
        tone: 'analytical, ranking-focused, practical',
        requiredSectionHeadings: ['SEO Objectives', 'Technical Findings', 'Impact and Priority', 'Implementation Roadmap'],
        mustInclude: ['crawlability notes', 'indexation issues', 'site performance concerns', 'priority fixes'],
    },
    'Google Ads Architecture': {
        promptKey: 'google-ads-architecture',
        documentType: 'Paid Acquisition Campaign Architecture Plan',
        objective: 'Turn the brief into a campaign architecture and optimization document for Google Ads execution.',
        tone: 'performance-marketing, focused, measurable',
        requiredSectionHeadings: ['Acquisition Goals', 'Campaign Structure', 'Targeting and Messaging', 'Measurement Plan'],
        mustInclude: ['campaign breakdown', 'keyword or audience logic', 'creative direction', 'tracking requirements'],
    },
    'Personal Branding Strategy': {
        promptKey: 'personal-branding-strategy',
        documentType: 'Personal Brand Growth Strategy',
        objective: 'Create a founder or expert personal branding plan that aligns positioning, content, audience, and growth steps.',
        tone: 'strategic, authentic, growth-oriented',
        requiredSectionHeadings: ['Brand Positioning', 'Audience and Platform Focus', 'Content Strategy', 'Growth Plan'],
        mustInclude: ['voice and positioning', 'content pillars', 'platform priorities', 'execution cadence'],
    },
    'E-commerce Email Automation': {
        promptKey: 'ecommerce-email-automation',
        documentType: 'Email Automation Strategy and Flow Plan',
        objective: 'Produce an email automation document that defines lifecycle flows, segmentation, messaging, and KPIs.',
        tone: 'retention-focused, clear, commercially sharp',
        requiredSectionHeadings: ['Lifecycle Goals', 'Flow Architecture', 'Messaging Strategy', 'Measurement and Optimization'],
        mustInclude: ['automation flow priorities', 'segment logic', 'message sequencing', 'success metrics'],
    },
    'SaaS Financial Model': {
        promptKey: 'saas-financial-model',
        documentType: 'SaaS Financial Modeling Pack',
        objective: 'Create a finance-oriented planning document that frames revenue assumptions, costs, scenarios, and board-level implications.',
        tone: 'financial, executive, structured',
        requiredSectionHeadings: ['Model Objective', 'Revenue Drivers', 'Cost Structure and Scenarios', 'Decision Support Notes'],
        mustInclude: ['core assumptions', 'revenue and cost drivers', 'scenario framing', 'board or investor implications'],
    },
    'SaaS Legal Pack': {
        promptKey: 'saas-legal-pack',
        documentType: 'Legal Documentation Planning Pack',
        objective: 'Convert the brief into a legal documentation scope, priorities, risks, and drafting guidance document.',
        tone: 'formal, risk-aware, commercially grounded',
        requiredSectionHeadings: ['Legal Scope', 'Business and Compliance Risks', 'Document Priorities', 'Drafting Notes'],
        mustInclude: ['document list', 'jurisdiction or compliance considerations', 'risk areas', 'required business inputs'],
    },
    'MVP Product Roadmap': {
        promptKey: 'mvp-product-roadmap',
        documentType: 'MVP Product Strategy and Roadmap',
        objective: 'Produce a roadmap document covering MVP scope, sequencing, user value, and release planning.',
        tone: 'product-strategic, lean, decision-oriented',
        requiredSectionHeadings: ['Product Objective', 'MVP Scope', 'Prioritization Logic', 'Release Roadmap'],
        mustInclude: ['problem framing', 'MVP boundaries', 'feature priorities', 'release sequencing'],
    },
    'Executive BI Dashboard': {
        promptKey: 'executive-bi-dashboard',
        documentType: 'Executive Dashboard Specification',
        objective: 'Generate a BI dashboard specification document focused on KPIs, data sources, visual hierarchy, and adoption.',
        tone: 'executive, analytical, implementation-ready',
        requiredSectionHeadings: ['Decision-Making Goals', 'KPI and Data Scope', 'Dashboard Design Logic', 'Adoption and Rollout'],
        mustInclude: ['KPI framework', 'data source assumptions', 'visual layout priorities', 'rollout notes'],
    },
    'UX Microcopy Audit': {
        promptKey: 'ux-microcopy-audit',
        documentType: 'UX Microcopy Audit Report',
        objective: 'Create a microcopy audit with clarity, friction, trust, and conversion recommendations across the user journey.',
        tone: 'UX-focused, sharp, empathetic',
        requiredSectionHeadings: ['Journey Context', 'Microcopy Findings', 'Clarity and Conversion Risks', 'Rewrite Priorities'],
        mustInclude: ['copy friction points', 'trust and clarity issues', 'recommended rewrite direction', 'priority actions'],
    },
    'Short-Form Video Pack (5)': {
        promptKey: 'short-form-video-pack-5',
        documentType: 'Short-Form Video Content Plan',
        objective: 'Turn the brief into a short-form video strategy document covering content angles, hooks, narrative beats, and production direction.',
        tone: 'fast-paced, audience-aware, creator-focused',
        requiredSectionHeadings: ['Content Goals', 'Video Concepts and Hooks', 'Production Direction', 'Publishing Plan'],
        mustInclude: ['hook strategy', 'concept breakdown', 'editing or pacing direction', 'distribution notes'],
    },
    'Developer API Docs': {
        promptKey: 'developer-api-docs',
        documentType: 'Developer Documentation Blueprint',
        objective: 'Create a documentation plan that structures API onboarding, endpoint guidance, examples, and developer enablement.',
        tone: 'technical, developer-friendly, organized',
        requiredSectionHeadings: ['Developer Goals', 'Documentation Structure', 'Endpoint and Example Strategy', 'Maintenance Notes'],
        mustInclude: ['audience assumptions', 'documentation architecture', 'example priorities', 'maintenance guidance'],
    },
    'Landing Page Copy': {
        promptKey: 'landing-page-copy',
        documentType: 'Landing Page Messaging and Copy Plan',
        objective: 'Create a conversion-focused landing page copy document with messaging hierarchy, sections, proof, and CTA logic.',
        tone: 'persuasive, clear, high-converting',
        requiredSectionHeadings: ['Messaging Strategy', 'Page Structure', 'Proof and Objection Handling', 'Conversion Recommendations'],
        mustInclude: ['headline direction', 'section-by-section message priorities', 'proof points', 'CTA strategy'],
    },
};

const DEFAULT_PROMPT_CONFIG: ServicePromptConfig = {
    promptKey: 'generic-service-document',
    documentType: 'Client Delivery Blueprint',
    objective: 'Produce a polished, client-facing document that turns the order brief into a concrete deliverable plan tailored to the selected service.',
    tone: 'clear, professional, actionable',
    requiredSectionHeadings: ['Project Goals', 'Recommended Approach', 'Execution Plan', 'Delivery Notes'],
    mustInclude: ['key assumptions', 'service-specific recommendations', 'delivery scope', 'next actions'],
};

export function getServicePromptConfig(serviceTitle: string) {
    return SERVICE_PROMPT_CONFIGS[serviceTitle] || DEFAULT_PROMPT_CONFIG;
}

export function getPromptKeyForService(serviceTitle: string) {
    return getServicePromptConfig(serviceTitle).promptKey;
}

export function buildDeveloperPrompt(config: ServicePromptConfig) {
    return [
        'You are producing a premium client-ready deliverable for Skills-Trade.',
        `Document type: ${config.documentType}.`,
        `Primary objective: ${config.objective}`,
        `Tone: ${config.tone}.`,
        'Return strictly valid JSON matching the provided schema.',
        'Write for a paying client, not for an internal team.',
        'Use the exact section headings requested for this service unless the user brief makes one clearly impossible.',
        `Required section headings: ${config.requiredSectionHeadings.join(', ')}.`,
        `Must include: ${config.mustInclude.join(', ')}.`,
        'Do not mention being an AI model.',
        'Do not output markdown fences.',
        'If the brief is incomplete, make reasonable professional assumptions and list them in the assumptions array.',
        'Keep recommendations specific to the selected service and the uploaded context.',
    ].join('\n');
}

export function buildUserPrompt(input: {
    serviceSnapshot: IOrderServiceSnapshot;
    projectBrief: string;
    attachmentSummaries: string[];
}) {
    const { serviceSnapshot, projectBrief, attachmentSummaries } = input;
    const availableUpgradesList = serviceSnapshot.availableUpgrades || [];
    const selectedUpgradesList = serviceSnapshot.selectedAddons || [];

    const availableUpgrades =
        availableUpgradesList.length > 0
            ? availableUpgradesList
                .map((upgrade) => `- ${upgrade.title}: ${upgrade.description} (${upgrade.priceTokens} tokens)`)
                .join('\n')
            : '- No upgrades available for this service';

    const selectedUpgrades =
        selectedUpgradesList.length > 0
            ? selectedUpgradesList
                .map((addon) => `- ${addon.title}: ${addon.description} (${addon.priceTokens} tokens)`)
                .join('\n')
            : '- No upgrades selected';

    const deliverables =
        serviceSnapshot.deliverables.length > 0
            ? serviceSnapshot.deliverables.map((item) => `- ${item}`).join('\n')
            : '- No predefined deliverables listed';

    const attachments =
        attachmentSummaries.length > 0
            ? attachmentSummaries.map((item) => `- ${item}`).join('\n')
            : '- No attachments provided';

    return [
        'Selected service:',
        `- Title: ${serviceSnapshot.title}`,
        `- Category: ${serviceSnapshot.category}`,
        `- Overview: ${serviceSnapshot.overview}`,
        `- Delivery days: ${serviceSnapshot.deliveryDays}`,
        `- Base token price: ${serviceSnapshot.priceTokens}`,
        'Service deliverables:',
        deliverables,
        'Available upgrades:',
        availableUpgrades,
        'Selected upgrades:',
        selectedUpgrades,
        'Project brief:',
        projectBrief,
        'Attachment context:',
        attachments,
    ].join('\n');
}
