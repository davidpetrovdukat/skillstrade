import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { User, UserRole } from '../src/models/User';
import { Freelancer } from '../src/models/Freelancer';
import { Service } from '../src/models/Service';
import { Order, OrderStatus } from '../src/models/Order';
import { Transaction, TxType } from '../src/models/Transaction';

// Load env vars
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is required in .env');
    process.exit(1);
}

// Use RAW_SERVICES_DATA directly as it has the correct prices and addons
import { RAW_SERVICES_DATA } from '../src/lib/services-data';
// import { PROFILES } from '../src/lib/data'; // We can use PROFILES for extra bio info if needed, but RAW_SERVICES_DATA seems to have the critical service info.
// Actually, RAW_SERVICES_DATA is structured differently (ServiceItemRaw). 
// PROFILES in data.ts has bio.skills which we need.
// We need to MERGE them or use PROFILES and enrich it with RAW_SERVICES_DATA services.
// Let's import both.
import { PROFILES as STATIC_PROFILES } from '../src/lib/data';

// Map profiles by ID for easy lookup
const profileMap = new Map(STATIC_PROFILES.map(p => [p.id, p]));

async function seed() {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ Connected.');

    console.log('🧹 Clearing database (dropping collections)...');
    try {
        await User.collection.drop();
        await Freelancer.collection.drop();
        await Service.collection.drop();
        await Order.collection.drop();
        await Transaction.collection.drop();
    } catch (e) {
        console.log('⚠️ Some collections might not exist, skipping drop...');
    }
    console.log('✅ Database cleared.');

    // Create Client
    const client = await User.create({
        firstName: 'Alice',
        lastName: 'Client',
        email: 'client@SKILLS-TRADE.com',
        role: UserRole.CLIENT,
        walletBalance: 50000
    });
    console.log('👤 Created Client: Alice');

    // Iterate over RAW_SERVICES_DATA because it has the corrected prices and addons
    for (const item of RAW_SERVICES_DATA) {
        const staticProfile = profileMap.get(item.id);
        const meta = item.meta;

        // Use static profile bio/portfolio if available, otherwise defaults
        const bioText = staticProfile?.bio.about_text || staticProfile?.bio.tagline || item.service.overview;
        const skills = staticProfile?.bio.skills || [];
        const portfolio = staticProfile?.portfolio || [];

        // Create User (Freelancer)
        const firstName = meta.name.split(' ')[0];
        const lastName = meta.name.split(' ').slice(1).join(' ') || '';
        const slug = item.id.split('_').length > 2 ? item.id.split('_')[2] : firstName.toLowerCase();

        const fUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: `${slug}@SKILLS-TRADE.com`,
            role: UserRole.FREELANCER,
            walletBalance: 0
        });

        // Create Freelancer Profile
        const freelancer = await Freelancer.create({
            user: fUser._id,
            slug: meta.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
            name: meta.name,
            avatarUrl: meta.avatar_url,
            location: meta.location,
            flag: meta.flag,
            role: meta.role,
            bio: bioText.substring(0, 500),
            skills: skills,
            portfolio: portfolio.map((p: any) => ({
                title: p.title,
                category: p.category,
                imageUrl: p.image_url
            })),
            isAvailable: meta.verified, // Assuming verified means available in this context or default true
            verified: meta.verified,
            rating: 5.0, // Default or randomized
            reviewsCount: 10 // Default
        });

        // Create Service
        // Determine image URL
        let imageUrl = '/window.svg';
        if (item.service.title.toLowerCase().includes("brand")) imageUrl = "/services/brand_identity.webp";
        else if (item.service.title.toLowerCase().includes("saas")) imageUrl = "/services/saas_ui_ux.webp";
        else if (item.service.title.toLowerCase().includes("3d")) imageUrl = "/services/3d_motion.webp";
        else if (item.service.title.toLowerCase().includes("app")) imageUrl = "/services/mobile_app.webp";
        else if (item.service.title.toLowerCase().includes("webflow")) imageUrl = "/services/webflow.webp";
        else if (item.service.title.toLowerCase().includes("react")) imageUrl = "/services/react_next.webp";
        else if (item.service.title.toLowerCase().includes("shopify")) imageUrl = "/services/shopify.webp";
        else if (item.service.title.toLowerCase().includes("python")) imageUrl = "/services/python_automation.webp";
        else if (item.service.title.toLowerCase().includes("security")) imageUrl = "/services/security_audit.webp";
        else if (item.service.title.toLowerCase().includes("seo")) imageUrl = "/services/seo.webp";
        else if (item.service.title.toLowerCase().includes("google")) imageUrl = "/services/google_ads.webp";
        else if (item.service.title.toLowerCase().includes("social")) imageUrl = "/services/social_media.webp";
        else if (item.service.title.toLowerCase().includes("email")) imageUrl = "/services/email_crm.webp";
        else if (item.service.title.toLowerCase().includes("finance")) imageUrl = "/services/finance_cfo.webp";
        else if (item.service.title.toLowerCase().includes("legal")) imageUrl = "/services/legal.webp";
        else if (item.service.title.toLowerCase().includes("product")) imageUrl = "/services/product_management.webp";
        else if (item.service.title.toLowerCase().includes("data")) imageUrl = "/services/data_vizualization.webp";
        else if (item.service.title.toLowerCase().includes("writing")) imageUrl = "/services/ux_writing.webp";
        else if (item.service.title.toLowerCase().includes("video")) imageUrl = "/services/video_editing.webp";
        else if (item.service.title.toLowerCase().includes("copy")) imageUrl = "/services/copywriting.webp";

        // Simpler fallback: use the first portfolio image if available and map it
        if (portfolio.length > 0) {
            imageUrl = portfolio[0].image_url;
        }

        const service = await Service.create({
            title: item.service.title,
            priceTokens: item.service.price_tokens, // THIS HAS THE CORRECT PRICE (e.g. 25000)
            displayPrice: item.service.display_price_eur,
            deliveryDays: 7, // Default
            category: "Creative",
            tags: skills.slice(0, 3),
            overview: item.service.overview,
            deliverables: [], // Missing in ServiceRaw but can be empty
            imageUrl: imageUrl,
            freelancer: freelancer._id,
            addons: item.service.addons.map(a => ({
                title: a.title,
                description: a.desc,
                priceTokens: a.price_tokens,
                isStandalone: a.is_standalone
            })),
            reviews: [] // Add placeholder reviews
        });

        // Add placeholder review
        service.reviews.push({
            authorName: "Alice Client",
            text: "Excellent work!",
            rating: 5,
            createdAt: new Date()
        });
        await service.save();

        console.log(`✨ Created Freelancer: ${meta.name} + Service: ${item.service.title} (${item.service.price_tokens} TKN)`);

        // Create Dummy Order
        if (meta.name.includes('Arthur')) {
            await Order.create({
                client: client._id,
                freelancer: freelancer._id,
                service: service._id,
                totalTokens: item.service.price_tokens,
                status: OrderStatus.COMPLETED,
                brief: { title: "Logo Design", description: "Logo needed" },
                attachments: [],
                createdAt: new Date(Date.now() - 86400000 * 5)
            });
            await Transaction.create({
                user: client._id,
                amount: -item.service.price_tokens,
                type: TxType.SPEND,
                description: `Order for ${item.service.title}`
            });
        }
    }

    console.log('✅ Seeding completed!');
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
