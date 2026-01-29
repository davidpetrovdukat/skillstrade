
import { PrismaClient, Role, OrderStatus, TxType } from '@prisma/client'

const prisma = new PrismaClient()

// --- INLINED DATA TO AVOID IMPORT ISSUES ---

interface Addon {
    id: string;
    title: string;
    price_tokens: number;
    is_standalone: boolean;
    desc: string;
}

interface ServiceMeta {
    name: string;
    role: string;
    location: string;
    flag: string;
    avatar_url: string;
    verified: boolean;
}

interface ServiceRaw {
    title: string;
    price_tokens: number;
    display_price_eur: string;
    overview: string;
    addons: Addon[];
}

interface ServiceItemRaw {
    id: string;
    meta: ServiceMeta;
    service: ServiceRaw;
}

const SERVICE_IMAGE_MAP: Record<string, string> = {
    "Strategic Brand Identity Suite": "/services/brand_identity.webp",
    "Scalable SaaS Design System": "/services/saas_ui_ux.webp",
    "Scalable SaaS Design System & UI Kit": "/services/saas_ui_ux.webp",
    "Cinematic 3D Product Animation": "/services/3d_motion.webp",
    "Cinematic 3D Product Animation (15s)": "/services/3d_motion.webp",
    "Photorealistic Product Visualization": "/services/product_renders.webp",
    "Series A Investment Pitch Deck": "/services/pitch_Decks.webp",
    "Premium Mobile App UI": "/services/mobile_app.webp",
    "Premium Mobile App UI/UX (iOS & Android)": "/services/mobile_app.webp",
    "Custom Webflow Development": "/services/webflow.webp",
    "Custom Webflow Development & Interactions": "/services/webflow.webp",
    "Modern Front-End (Next.js)": "/services/react_next.webp",
    "Modern Front-End Development (Next.js)": "/services/react_next.webp",
    "Smart Contract Development": "/services/smart_contracts.webp",
    "Smart Contract Development & Auditing": "/services/smart_contracts.webp",
    "High-Conversion Shopify Store": "/services/shopify.webp",
    "High-Conversion Shopify Store Setup": "/services/shopify.webp",
    "Business Automation Scripts": "/services/python_automation.webp",
    "Custom Business Automation Scripts": "/services/python_automation.webp",
    "Web Application Penetration Test": "/services/security_audit.webp",
    "Deep Technical SEO Audit": "/services/seo.webp",
    "Deep Technical SEO Audit & Strategy": "/services/seo.webp",
    "Google Ads Architecture": "/services/google_ads.webp",
    "Google Ads Campaign Architecture Setup": "/services/google_ads.webp",
    "Personal Branding Strategy": "/services/social_media.webp",
    "Founder Personal Branding Strategy": "/services/social_media.webp",
    "E-commerce Email Automation": "/services/email_crm.webp",
    "E-commerce Email Automation Setup (Klaviyo)": "/services/email_crm.webp",
    "SaaS Financial Model": "/services/finance_cfo.webp",
    "SaaS Financial Model & Valuation": "/services/finance_cfo.webp",
    "SaaS Legal Pack": "/services/legal.webp",
    "SaaS Legal Pack (GDPR + Terms)": "/services/legal.webp",
    "MVP Product Roadmap": "/services/product_management.webp",
    "MVP Product Strategy & Roadmap": "/services/product_management.webp",
    "Executive BI Dashboard": "/services/data_vizualization.webp",
    "Executive BI Dashboard Setup": "/services/data_vizualization.webp",
    "UX Microcopy Audit": "/services/ux_writing.webp",
    "UX Writing & Microcopy Audit": "/services/ux_writing.webp",
    "Short-Form Video Pack (5)": "/services/video_editing.webp",
    "High-Retention Short-Form Video Pack (5 Videos)": "/services/video_editing.webp",
    "Developer API Docs": "/services/tech_docs.webp",
    "Developer-First API Documentation": "/services/tech_docs.webp",
    "Landing Page Copy": "/services/copywriting.webp",
    "High-Converting Landing Page Copy": "/services/copywriting.webp"
};

const RAW_SERVICES_DATA: ServiceItemRaw[] = [
    {
        "id": "user_01_arthur",
        "meta": {
            "name": "Arthur Sterling",
            "role": "Strategic Brand Identity",
            "location": "London, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/arthur-uk.webp",
            "verified": true
        },
        "service": {
            "title": "Strategic Brand Identity Suite",
            "price_tokens": 25000,
            "display_price_eur": "€250",
            "overview": "A timeless, adaptive visual system designed to scale. Includes logo, typography, color palette, and guidelines.",
            "addons": [
                {
                    "id": "a01_1",
                    "title": "Favicon Export (.ico)",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Convert existing logo to perfect favicon."
                },
                {
                    "id": "a01_2",
                    "title": "Business Card Layout",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Print-ready PDF design."
                },
                {
                    "id": "a01_3",
                    "title": "Brand Strategy Audit (PDF)",
                    "price_tokens": 1500,
                    "is_standalone": true,
                    "desc": "Written analysis of your current brand."
                },
                {
                    "id": "a01_4",
                    "title": "Social Media Kit",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Profile & Banner assets."
                },
                {
                    "id": "a01_5",
                    "title": "Source Files (Vector)",
                    "price_tokens": 2500,
                    "is_standalone": false,
                    "desc": "AI, EPS, SVG master files."
                },
                {
                    "id": "a01_6",
                    "title": "Rush Delivery (7 Days)",
                    "price_tokens": 5000,
                    "is_standalone": false,
                    "desc": "Priority processing."
                }
            ]
        }
    },
    {
        "id": "user_02_elena",
        "meta": {
            "name": "Elena Richter",
            "role": "SaaS UI/UX Design",
            "location": "Berlin, Germany",
            "flag": "🇩🇪",
            "avatar_url": "/avatars/elena-de.webp",
            "verified": true
        },
        "service": {
            "title": "Scalable SaaS Design System",
            "price_tokens": 35000,
            "display_price_eur": "€350",
            "overview": "Complete atomic design system and UI kit for scaling SaaS products. Figma sources included.",
            "addons": [
                {
                    "id": "a02_1",
                    "title": "Single Icon Design",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "One custom SVG icon."
                },
                {
                    "id": "a02_2",
                    "title": "Login Screen UI",
                    "price_tokens": 1500,
                    "is_standalone": true,
                    "desc": "High-fidelity login page design."
                },
                {
                    "id": "a02_3",
                    "title": "Button Component Set",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "States: Hover, Active, Disabled."
                },
                {
                    "id": "a02_4",
                    "title": "Dark Mode Version",
                    "price_tokens": 5000,
                    "is_standalone": false,
                    "desc": "Full dark theme adaptation."
                },
                {
                    "id": "a02_5",
                    "title": "Clickable Prototype",
                    "price_tokens": 3000,
                    "is_standalone": false,
                    "desc": "Interactive flows in Figma."
                }
            ]
        }
    },
    {
        "id": "user_03_julien",
        "meta": {
            "name": "Julien Dubois",
            "role": "3D Motion Graphics",
            "location": "Paris, France",
            "flag": "🇫🇷",
            "avatar_url": "/avatars/julien-fr.jpg",
            "verified": true
        },
        "service": {
            "title": "Cinematic 3D Product Animation",
            "price_tokens": 18000,
            "display_price_eur": "€180",
            "overview": "15-second photorealistic 3D animation to showcase your product. Includes lighting and texturing.",
            "addons": [
                {
                    "id": "a03_1",
                    "title": "GIF Loop Export",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Optimized loop for web/email."
                },
                {
                    "id": "a03_2",
                    "title": "Static Hero Render",
                    "price_tokens": 1000,
                    "is_standalone": true,
                    "desc": "4K still image from 3D model."
                },
                {
                    "id": "a03_3",
                    "title": "Texture Pack",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "High-res texture files."
                },
                {
                    "id": "a03_4",
                    "title": "Sound Design & SFX",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Professional audio mix."
                },
                {
                    "id": "a03_5",
                    "title": "Vertical Cut (9:16)",
                    "price_tokens": 1500,
                    "is_standalone": false,
                    "desc": "For TikTok/Reels."
                }
            ]
        }
    },
    {
        "id": "user_04_lars",
        "meta": {
            "name": "Lars Jensen",
            "role": "Industrial Design Renders",
            "location": "Copenhagen, Denmark",
            "flag": "🇩🇰",
            "avatar_url": "/avatars/lars-dk.webp",
            "verified": true
        },
        "service": {
            "title": "Photorealistic Product Visualization",
            "price_tokens": 12000,
            "display_price_eur": "€120",
            "overview": "Studio-quality rendering for physical products. 5 angles included.",
            "addons": [
                {
                    "id": "a04_1",
                    "title": "Wireframe View",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Technical outline render."
                },
                {
                    "id": "a04_2",
                    "title": "Clay Render (White)",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Focus on shape/form."
                },
                {
                    "id": "a04_3",
                    "title": "Transparent BG Export",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "PNGs for e-commerce."
                },
                {
                    "id": "a04_4",
                    "title": "360 Turntable Video",
                    "price_tokens": 3000,
                    "is_standalone": false,
                    "desc": "Rotating loop video."
                },
                {
                    "id": "a04_5",
                    "title": "Lifestyle Scene",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Product in context environment."
                }
            ]
        }
    },
    {
        "id": "user_05_sophie",
        "meta": {
            "name": "Sophie Caldwell",
            "role": "Pitch Deck Design",
            "location": "Manchester, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/sophie-gb.avif",
            "verified": true
        },
        "service": {
            "title": "Series A Investment Pitch Deck",
            "price_tokens": 9500,
            "display_price_eur": "€95",
            "overview": "15-20 slide master deck optimized for fundraising. Compelling narrative structure.",
            "addons": [
                {
                    "id": "a05_1",
                    "title": "Email Signature",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Matching HTML signature."
                },
                {
                    "id": "a05_2",
                    "title": "One-Pager Summary",
                    "price_tokens": 1500,
                    "is_standalone": true,
                    "desc": "A4 PDF Executive Summary."
                },
                {
                    "id": "a05_3",
                    "title": "Single Chart Redesign",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Fix one complex graph."
                },
                {
                    "id": "a05_4",
                    "title": "Financials Slide",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Data-heavy slide formatting."
                },
                {
                    "id": "a05_5",
                    "title": "Editable Source File",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "PowerPoint/Figma master."
                }
            ]
        }
    },
    {
        "id": "user_06_giulia",
        "meta": {
            "name": "Giulia Rossi",
            "role": "Mobile App UI/UX",
            "location": "Milan, Italy",
            "flag": "🇮🇹",
            "avatar_url": "/avatars/giulia-it.jpg",
            "verified": true
        },
        "service": {
            "title": "Premium Mobile App UI",
            "price_tokens": 21000,
            "display_price_eur": "€210",
            "overview": "10-15 key screens for iOS/Android with native feel and ergonomic UX.",
            "addons": [
                {
                    "id": "a06_1",
                    "title": "App Icon Design",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "iOS/Android export sizes."
                },
                {
                    "id": "a06_2",
                    "title": "Splash Screen",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Loading state design."
                },
                {
                    "id": "a06_3",
                    "title": "Empty State Illustration",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Custom vector graphic."
                },
                {
                    "id": "a06_4",
                    "title": "Tablet Adaptation",
                    "price_tokens": 4000,
                    "is_standalone": false,
                    "desc": "iPad/Tablet version."
                },
                {
                    "id": "a06_5",
                    "title": "Dark Mode",
                    "price_tokens": 3000,
                    "is_standalone": false,
                    "desc": "Inverted color scheme."
                }
            ]
        }
    },
    {
        "id": "user_07_marcus",
        "meta": {
            "name": "Marcus Thorne",
            "role": "Webflow Development",
            "location": "London, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/marcus-uk.webp",
            "verified": true
        },
        "service": {
            "title": "Custom Webflow Development",
            "price_tokens": 16000,
            "display_price_eur": "€160",
            "overview": "Pixel-perfect conversion from design to Webflow. 'Client-First' class naming.",
            "addons": [
                {
                    "id": "a07_1",
                    "title": "Broken Link Check",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Report of 404 errors."
                },
                {
                    "id": "a07_2",
                    "title": "Cookie Banner Setup",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "GDPR compliant popup."
                },
                {
                    "id": "a07_3",
                    "title": "Custom 404 Page",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Branded error page."
                },
                {
                    "id": "a07_4",
                    "title": "CMS Blog Setup",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Dynamic content collection."
                },
                {
                    "id": "a07_5",
                    "title": "Lottie Integration",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Advanced motion implementation."
                }
            ]
        }
    },
    {
        "id": "user_08_stefan",
        "meta": {
            "name": "Stefan Kovac",
            "role": "React / Next.js Dev",
            "location": "Prague, Czech Republic",
            "flag": "🇨🇿",
            "avatar_url": "/avatars/stefan-cz.avif",
            "verified": true
        },
        "service": {
            "title": "Modern Front-End (Next.js)",
            "price_tokens": 25000,
            "display_price_eur": "€250",
            "overview": "Robust front-end architecture using Next.js 14 and TypeScript. SSR optimized.",
            "addons": [
                {
                    "id": "a08_1",
                    "title": "Meta Tags Setup",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "SEO head tags configuration."
                },
                {
                    "id": "a08_2",
                    "title": "Readme.md Documentation",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Setup instructions file."
                },
                {
                    "id": "a08_3",
                    "title": "Small Bug Fix",
                    "price_tokens": 1000,
                    "is_standalone": true,
                    "desc": "Fix for one specific issue."
                },
                {
                    "id": "a08_4",
                    "title": "PWA Setup",
                    "price_tokens": 5000,
                    "is_standalone": false,
                    "desc": "Progressive Web App features."
                },
                {
                    "id": "a08_5",
                    "title": "Analytics Integration",
                    "price_tokens": 500,
                    "is_standalone": false,
                    "desc": "Google/Posthog setup."
                }
            ]
        }
    },
    {
        "id": "user_09_erik",
        "meta": {
            "name": "Erik Saar",
            "role": "Smart Contracts & Web3",
            "location": "Tallinn, Estonia",
            "flag": "🇪🇪",
            "avatar_url": "/avatars/erik-ee.webp",
            "verified": true
        },
        "service": {
            "title": "Smart Contract Development",
            "price_tokens": 40000,
            "display_price_eur": "€400",
            "overview": "Secure Solidity contracts for ERC-20, NFT, or DeFi. Gas optimized.",
            "addons": [
                {
                    "id": "a09_1",
                    "title": "Token Icon Resize",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Format for Metamask/Trust."
                },
                {
                    "id": "a09_2",
                    "title": "Contract Verify (Etherscan)",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Source code verification."
                },
                {
                    "id": "a09_3",
                    "title": "Gas Estimation Report",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Cost analysis PDF."
                },
                {
                    "id": "a09_4",
                    "title": "Unit Test Suite",
                    "price_tokens": 5000,
                    "is_standalone": false,
                    "desc": "Hardhat/Foundry tests."
                },
                {
                    "id": "a09_5",
                    "title": "Deployment Script",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Automated deploy logic."
                }
            ]
        }
    },
    {
        "id": "user_10_bram",
        "meta": {
            "name": "Bram Van Dijk",
            "role": "Shopify Expert",
            "location": "Amsterdam, Netherlands",
            "flag": "🇳🇱",
            "avatar_url": "/avatars/bram-nl.webp",
            "verified": true
        },
        "service": {
            "title": "High-Conversion Shopify Store",
            "price_tokens": 14000,
            "display_price_eur": "€140",
            "overview": "Shopify 2.0 setup with custom Liquid tweaks for maximum conversion.",
            "addons": [
                {
                    "id": "a10_1",
                    "title": "Trust Badge Install",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Payment icons in footer."
                },
                {
                    "id": "a10_2",
                    "title": "Metafield Setup",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Custom data fields."
                },
                {
                    "id": "a10_3",
                    "title": "Product Description (1)",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "SEO optimized text."
                },
                {
                    "id": "a10_4",
                    "title": "Upsell App Config",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Cross-sell logic setup."
                },
                {
                    "id": "a10_5",
                    "title": "Mega Menu Design",
                    "price_tokens": 1500,
                    "is_standalone": false,
                    "desc": "Advanced navigation."
                }
            ]
        }
    },
    {
        "id": "user_11_thomas",
        "meta": {
            "name": "Thomas Müller",
            "role": "Python Automation",
            "location": "Vienna, Austria",
            "flag": "🇦🇹",
            "avatar_url": "/avatars/thomas-at.webp",
            "verified": true
        },
        "service": {
            "title": "Business Automation Scripts",
            "price_tokens": 8000,
            "display_price_eur": "€80",
            "overview": "Custom Python scripts to scrape data or automate workflows.",
            "addons": [
                {
                    "id": "a11_1",
                    "title": "Regex Fix",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Fix text matching pattern."
                },
                {
                    "id": "a11_2",
                    "title": "Cron Job Setup",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Schedule auto-run."
                },
                {
                    "id": "a11_3",
                    "title": "CSV Data Cleanup",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Format/deduplicate file."
                },
                {
                    "id": "a11_4",
                    "title": "Compile to EXE",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Run without Python installed."
                },
                {
                    "id": "a11_5",
                    "title": "Source Code Comments",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Detailed documentation."
                }
            ]
        }
    },
    {
        "id": "user_12_andreas",
        "meta": {
            "name": "Andreas Weber",
            "role": "Cybersecurity Audits",
            "location": "Zurich, Switzerland",
            "flag": "🇨🇭",
            "avatar_url": "/avatars/andreas-ch.jpg",
            "verified": true
        },
        "service": {
            "title": "Web Application Penetration Test",
            "price_tokens": 32000,
            "display_price_eur": "€320",
            "overview": "Rigorous manual and automated security audit covering OWASP Top 10.",
            "addons": [
                {
                    "id": "a12_1",
                    "title": "SSL Certificate Check",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Verify TLS configuration."
                },
                {
                    "id": "a12_2",
                    "title": "Password Policy Review",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Best practice check."
                },
                {
                    "id": "a12_3",
                    "title": "Security Headers Check",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "CSP/HSTS analysis."
                },
                {
                    "id": "a12_4",
                    "title": "PDF Executive Report",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Board-ready summary."
                },
                {
                    "id": "a12_5",
                    "title": "Fix Verification Re-test",
                    "price_tokens": 5000,
                    "is_standalone": false,
                    "desc": "Validate applied patches."
                }
            ]
        }
    },
    {
        "id": "user_13_claire",
        "meta": {
            "name": "Claire O’Connor",
            "role": "Technical SEO Audits",
            "location": "Dublin, Ireland",
            "flag": "🇮🇪",
            "avatar_url": "/avatars/claire-ie.jpeg",
            "verified": true
        },
        "service": {
            "title": "Deep Technical SEO Audit",
            "price_tokens": 11000,
            "display_price_eur": "€110",
            "overview": "Analysis of site architecture, crawling, and Core Web Vitals.",
            "addons": [
                {
                    "id": "a13_1",
                    "title": "Generate Robots.txt",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Crawl directive file."
                },
                {
                    "id": "a13_2",
                    "title": "Generate Sitemap.xml",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "URL index file."
                },
                {
                    "id": "a13_3",
                    "title": "H1 Tag Optimization",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Header structure fix."
                },
                {
                    "id": "a13_4",
                    "title": "Schema Markup",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "JSON-LD implementation."
                },
                {
                    "id": "a13_5",
                    "title": "Speed Fix Recommendations",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Specific dev tickets."
                }
            ]
        }
    },
    {
        "id": "user_14_hugo",
        "meta": {
            "name": "Hugo Martins",
            "role": "Google Ads (PPC)",
            "location": "Lisbon, Portugal",
            "flag": "🇵🇹",
            "avatar_url": "/avatars/hugo-pt.jpg",
            "verified": true
        },
        "service": {
            "title": "Google Ads Architecture",
            "price_tokens": 9000,
            "display_price_eur": "€90",
            "overview": "Granular campaign structure (SKAGs/STAGs) setup and targeting.",
            "addons": [
                {
                    "id": "a14_1",
                    "title": "Negative Keyword List",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Block irrelevant traffic."
                },
                {
                    "id": "a14_2",
                    "title": "Ad Text Variation",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "One RSA copy set."
                },
                {
                    "id": "a14_3",
                    "title": "Seed Keyword List",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "High intent terms."
                },
                {
                    "id": "a14_4",
                    "title": "GTM Conversion Setup",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Tracking pixels."
                },
                {
                    "id": "a14_5",
                    "title": "Display Banners (3)",
                    "price_tokens": 1500,
                    "is_standalone": false,
                    "desc": "Visual assets."
                }
            ]
        }
    },
    {
        "id": "user_15_lucia",
        "meta": {
            "name": "Lucia Fernandez",
            "role": "Social Media Strategy",
            "location": "Madrid, Spain",
            "flag": "🇪🇸",
            "avatar_url": "/avatars/lucia-es.webp",
            "verified": true
        },
        "service": {
            "title": "Personal Branding Strategy",
            "price_tokens": 15000,
            "display_price_eur": "€150",
            "overview": "Content pillars and positioning strategy for founders on LinkedIn/X.",
            "addons": [
                {
                    "id": "a15_1",
                    "title": "Hashtag Research",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Niche tag list."
                },
                {
                    "id": "a15_2",
                    "title": "LinkedIn Bio Rewrite",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Profile optimization."
                },
                {
                    "id": "a15_3",
                    "title": "Header Image Design",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Custom banner graphic."
                },
                {
                    "id": "a15_4",
                    "title": "Post Templates (3)",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Canva/Figma layouts."
                },
                {
                    "id": "a15_5",
                    "title": "5 Extra Posts Writing",
                    "price_tokens": 3000,
                    "is_standalone": false,
                    "desc": "Ghostwritten content."
                }
            ]
        }
    },
    {
        "id": "user_16_nigel",
        "meta": {
            "name": "Nigel Rivers",
            "role": "Email Marketing & CRM",
            "location": "Bristol, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/oliver-uk.webp",
            "verified": true
        },
        "service": {
            "title": "E-commerce Email Automation",
            "price_tokens": 12500,
            "display_price_eur": "€125",
            "overview": "Setup of core Klaviyo flows: Welcome, Cart, Post-Purchase.",
            "addons": [
                {
                    "id": "a16_1",
                    "title": "Subject Line Ideas (10)",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "High open-rate hooks."
                },
                {
                    "id": "a16_2",
                    "title": "SPAM Word Check",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Deliverability audit."
                },
                {
                    "id": "a16_3",
                    "title": "Email Footer Design",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Legal & social links."
                },
                {
                    "id": "a16_4",
                    "title": "A/B Test Setup",
                    "price_tokens": 500,
                    "is_standalone": false,
                    "desc": "Split testing logic."
                },
                {
                    "id": "a16_5",
                    "title": "Custom HTML Template",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Code from scratch."
                }
            ]
        }
    },
    {
        "id": "user_17_james",
        "meta": {
            "name": "James Kensington",
            "role": "Fractional CFO / Finance",
            "location": "London, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/james-uk.webp",
            "verified": true
        },
        "service": {
            "title": "SaaS Financial Model",
            "price_tokens": 25000,
            "display_price_eur": "€250",
            "overview": "Dynamic 3-statement financial model for fundraising/valuation.",
            "addons": [
                {
                    "id": "a17_1",
                    "title": "PDF Conversion",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Export sheet to PDF."
                },
                {
                    "id": "a17_2",
                    "title": "Excel Formula Fix",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Debug one error."
                },
                {
                    "id": "a17_3",
                    "title": "Create One Chart",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Viz for pitch deck."
                },
                {
                    "id": "a17_4",
                    "title": "KPI Dashboard Tab",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Summary view setup."
                },
                {
                    "id": "a17_5",
                    "title": "Scenario Analysis",
                    "price_tokens": 3000,
                    "is_standalone": false,
                    "desc": "Best/Worst case tabs."
                }
            ]
        }
    },
    {
        "id": "user_18_antoine",
        "meta": {
            "name": "Antoine Lefevre",
            "role": "Tech Legal & IP",
            "location": "Lyon, France",
            "flag": "🇫🇷",
            "avatar_url": "/avatars/antoine-fr.webp",
            "verified": true
        },
        "service": {
            "title": "SaaS Legal Pack",
            "price_tokens": 9500,
            "display_price_eur": "€95",
            "overview": "GDPR-compliant Terms, Privacy Policy, and Cookie Policy.",
            "addons": [
                {
                    "id": "a18_1",
                    "title": "Footer Legal Links",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "List of required pages."
                },
                {
                    "id": "a18_2",
                    "title": "Cookie Banner Text",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Consent wording."
                },
                {
                    "id": "a18_3",
                    "title": "Invoice Template",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Compliant format."
                },
                {
                    "id": "a18_4",
                    "title": "IP Assignment Clause",
                    "price_tokens": 500,
                    "is_standalone": false,
                    "desc": "Freelancer contract addition."
                },
                {
                    "id": "a18_5",
                    "title": "DPA Agreement",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Data processing addendum."
                }
            ]
        }
    },
    {
        "id": "user_19_petra",
        "meta": {
            "name": "Petra Novak",
            "role": "Product Management",
            "location": "Warsaw, Poland",
            "flag": "🇵🇱",
            "avatar_url": "/avatars/petra-pl.avif",
            "verified": true
        },
        "service": {
            "title": "MVP Product Roadmap",
            "price_tokens": 18000,
            "display_price_eur": "€180",
            "overview": "Prioritized backlog, user personas, and strategic roadmap.",
            "addons": [
                {
                    "id": "a19_1",
                    "title": "Jira Ticket Cleanup",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Format one ticket."
                },
                {
                    "id": "a19_2",
                    "title": "Single User Story",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Acceptance criteria writing."
                },
                {
                    "id": "a19_3",
                    "title": "Feature Spec (1)",
                    "price_tokens": 500,
                    "is_standalone": true,
                    "desc": "Detailed requirements."
                },
                {
                    "id": "a19_4",
                    "title": "Competitor Feature Grid",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Comparison matrix."
                },
                {
                    "id": "a19_5",
                    "title": "Jira Project Setup",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Workflow configuration."
                }
            ]
        }
    },
    {
        "id": "user_20_kasia",
        "meta": {
            "name": "Kasia Wójcik",
            "role": "Data Visualization",
            "location": "Krakow, Poland",
            "flag": "🇵🇱",
            "avatar_url": "/avatars/kasia-pl.jpg",
            "verified": true
        },
        "service": {
            "title": "Executive BI Dashboard",
            "price_tokens": 11000,
            "display_price_eur": "€110",
            "overview": "Interactive Tableau/Looker dashboard connected to your data.",
            "addons": [
                {
                    "id": "a20_1",
                    "title": "Chart Color Fix",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Apply brand colors."
                },
                {
                    "id": "a20_2",
                    "title": "CSV Import Help",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Data formatting check."
                },
                {
                    "id": "a20_3",
                    "title": "SQL Query Fix",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Debug one query."
                },
                {
                    "id": "a20_4",
                    "title": "Automated Email Report",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Schedule setup."
                },
                {
                    "id": "a20_5",
                    "title": "Mobile Layout View",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Responsive optimization."
                }
            ]
        }
    },
    {
        "id": "user_21_eleanor",
        "meta": {
            "name": "Eleanor Brooks",
            "role": "UX Writing",
            "location": "Brighton, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/eleanor-gb.avif",
            "verified": true
        },
        "service": {
            "title": "UX Microcopy Audit",
            "price_tokens": 9000,
            "display_price_eur": "€90",
            "overview": "Rewrite of key user flows (Onboarding, Checkout) for clarity.",
            "addons": [
                {
                    "id": "a21_1",
                    "title": "Single Error Message",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Humanize one error."
                },
                {
                    "id": "a21_2",
                    "title": "Button Label Rewrite",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Optimize one CTA."
                },
                {
                    "id": "a21_3",
                    "title": "Tooltip Text",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Explain one feature."
                },
                {
                    "id": "a21_4",
                    "title": "Tone of Voice Guide",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Mini brand dictionary."
                },
                {
                    "id": "a21_5",
                    "title": "Onboarding Flow Script",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Step-by-step copy."
                }
            ]
        },
    },
    {
        "id": "user_22_leo",
        "meta": {
            "name": "Leo Davies",
            "role": "Video Editing (Reels)",
            "location": "London, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/leo-gb.avif",
            "verified": true
        },
        "service": {
            "title": "Short-Form Video Pack (5)",
            "price_tokens": 10000,
            "display_price_eur": "€100",
            "overview": "5 edited vertical videos with dynamic captions and pacing.",
            "addons": [
                {
                    "id": "a22_1",
                    "title": "Music Track Selection",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Find trending audio."
                },
                {
                    "id": "a22_2",
                    "title": "Captions Only (1 min)",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Add subtitles to video."
                },
                {
                    "id": "a22_3",
                    "title": "Video Thumbnail",
                    "price_tokens": 200,
                    "is_standalone": true,
                    "desc": "Cover image design."
                },
                {
                    "id": "a22_4",
                    "title": "4K Export",
                    "price_tokens": 500,
                    "is_standalone": false,
                    "desc": "High bitrate render."
                },
                {
                    "id": "a22_5",
                    "title": "Raw Project File",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Premiere/AE source."
                }
            ]
        }
    },
    {
        "id": "user_23_christian",
        "meta": {
            "name": "Christian Wessner",
            "role": "Technical Writing",
            "location": "Munich, Germany",
            "flag": "🇩🇪",
            "avatar_url": "/avatars/hans-de.webp",
            "verified": true
        },
        "service": {
            "title": "Developer API Docs",
            "price_tokens": 13000,
            "display_price_eur": "€130",
            "overview": "Structured documentation for API/SDK. Includes code snippets.",
            "addons": [
                {
                    "id": "a23_1",
                    "title": "Readme Typo Check",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "Proofread main file."
                },
                {
                    "id": "a23_2",
                    "title": "Curl Snippet",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "One code example."
                },
                {
                    "id": "a23_3",
                    "title": "Table of Contents",
                    "price_tokens": 100,
                    "is_standalone": true,
                    "desc": "Structure organization."
                },
                {
                    "id": "a23_4",
                    "title": "Mermaid Diagram",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Flowchart visualization."
                },
                {
                    "id": "a23_5",
                    "title": "Swagger/OpenAPI File",
                    "price_tokens": 2000,
                    "is_standalone": false,
                    "desc": "Standard spec format."
                }
            ]
        }
    },
    {
        "id": "user_24_sarah",
        "meta": {
            "name": "Sarah Jenkins",
            "role": "Conversion Copywriting",
            "location": "Bristol, UK",
            "flag": "🇬🇧",
            "avatar_url": "/avatars/sarah-gb.jpg",
            "verified": true
        },
        "service": {
            "title": "Landing Page Copy",
            "price_tokens": 8500,
            "display_price_eur": "€85",
            "overview": "Persuasive copy for LP: Headlines, Benefits, and CTAs.",
            "addons": [
                {
                    "id": "a24_1",
                    "title": "Headline (1)",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "One strong hook."
                },
                {
                    "id": "a24_2",
                    "title": "CTA Button Text",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "One action label."
                },
                {
                    "id": "a24_3",
                    "title": "Email Subject Line",
                    "price_tokens": 50,
                    "is_standalone": true,
                    "desc": "High open rate line."
                },
                {
                    "id": "a24_4",
                    "title": "SEO Keyword Integrate",
                    "price_tokens": 1000,
                    "is_standalone": false,
                    "desc": "Optimize for search."
                },
                {
                    "id": "a24_5",
                    "title": "Follow-up Emails (3)",
                    "price_tokens": 2500,
                    "is_standalone": false,
                    "desc": "Drip sequence copy."
                }
            ]
        }
    }
];

// --- END INLINED DATA ---

async function main() {
    console.log('🌱 Starting seed...')

    // Clean DB
    try {
        await prisma.transaction.deleteMany()
        await prisma.order.deleteMany()
        await prisma.review.deleteMany()
        await prisma.serviceAddon.deleteMany()
        await prisma.service.deleteMany()
        await prisma.freelancer.deleteMany()
        await prisma.user.deleteMany()
        console.log('Deleted existing data.')
    } catch (e) {
        console.warn('Cleanup warning (might be empty DB):', e)
    }

    // Create Client User (Alice)
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@skillstrade.com',
            firstName: 'Alice',
            lastName: 'Client',
            role: Role.CLIENT,
            walletBalance: 50000, // 500 EUR
            transactions: {
                create: {
                    amount: 50000,
                    type: TxType.DEPOSIT,
                    description: 'Initial Deposit'
                }
            }
        }
    })
    console.log('Created Client User: Alice')

    // Iterate Freelancers
    for (const item of RAW_SERVICES_DATA) {
        const { id: _ignoreId, meta, service: serviceData } = item
        const email = `${meta.name.split(' ')[0].toLowerCase()}@skillstrade.com`
        const slug = meta.name.toLowerCase().replace(/\s+/g, '-')

        console.log(`Processing ${meta.name}...`)

        // Create User for Freelancer
        const fUser = await prisma.user.create({
            data: {
                email,
                firstName: meta.name.split(' ')[0],
                lastName: meta.name.split(' ').slice(1).join(' '),
                role: Role.FREELANCER,
            }
        })

        // Create Freelancer Profile linked to User
        const freelancer = await prisma.freelancer.create({
            data: {
                userId: fUser.id,
                slug,
                name: meta.name,
                avatarUrl: meta.avatar_url,
                location: meta.location,
                flag: meta.flag,
                role: meta.role,
                bio: "Experienced professional delivering high-quality services for global clients.",
                verified: meta.verified,
                rating: 5.0, // Default starting rating
                reviewsCount: 0
            }
        })

        // Resolve Image
        // Try to find image in map by exact title match or partial
        let imageUrl = SERVICE_IMAGE_MAP[serviceData.title] || '/window.svg'

        // Create Service
        const service = await prisma.service.create({
            data: {
                title: serviceData.title,
                priceTokens: serviceData.price_tokens,
                displayPrice: serviceData.display_price_eur,
                // Defaults since these are not in RAW_SERVICES_DATA currently
                deliveryDays: 5,
                category: "Creative",
                tags: ["Professional", "Verified"],
                overview: serviceData.overview,
                deliverables: ["Source Files", "Revisions"],
                imageUrl,
                freelancerId: freelancer.id,
                addons: {
                    create: serviceData.addons.map(addon => ({
                        title: addon.title,
                        description: addon.desc,
                        priceTokens: addon.price_tokens,
                        isStandalone: addon.is_standalone
                    }))
                }
            }
        })

        // Create Dummy Order for Arthur (User 01)
        if (meta.name.includes('Arthur')) {
            await prisma.order.create({
                data: {
                    clientId: clientUser.id,
                    freelancerId: freelancer.id,
                    serviceId: service.id,
                    totalTokens: serviceData.price_tokens,
                    status: OrderStatus.COMPLETED,
                    brief: "I need a minimalist logo for my startup 'TechFlow'.",
                    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
                    deliveryDate: new Date(Date.now() - 86400000 * 1)
                }
            })

            // Add Transaction
            await prisma.transaction.create({
                data: {
                    userId: clientUser.id,
                    amount: -serviceData.price_tokens,
                    type: TxType.SPEND,
                    description: `Order #${slug.substring(0, 5)}...`
                }
            })
        }
    }

    console.log('✅ Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
