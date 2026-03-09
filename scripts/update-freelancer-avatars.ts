/**
 * Updates Freelancer avatarUrl in MongoDB from src/lib/services-data.ts.
 * Run after changing freelancer photos or avatar paths in the data files.
 *
 * Usage: npx ts-node -r tsconfig-paths/register scripts/update-freelancer-avatars.ts
 */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Freelancer } from '../src/models/Freelancer';
import { RAW_SERVICES_DATA } from '../src/lib/services-data';

// Legacy full names → username (for migrating existing DBs)
const LEGACY_NAME_TO_USERNAME: Record<string, string> = {
    'Arthur Sterling': 'arthur.brand', 'Elena Richter': 'elena.saasux', 'Julien Dubois': 'julien.motion',
    'Lars Jensen': 'lars.render', 'Sophie Caldwell': 'sophie.pitch', 'Giulia Rossi': 'giulia.mobile',
    'Marcus Thorne': 'marcus.webflow', 'Stefan Kovac': 'stefan.next', 'Erik Saar': 'erik.web3',
    'Bram Van Dijk': 'bram.shopify', 'Thomas Müller': 'thomas.python', 'Andreas Weber': 'andreas.cyber',
    "Claire O'Connor": 'claire.seoaudit', 'Hugo Martins': 'hugo.ppc', 'Lucia Fernandez': 'lucia.social',
    'Nigel Rivers': 'nigel.crm', 'James Kensington': 'james.cfo', 'Antoine Lefevre': 'antoine.legal',
    'Petra Novak': 'petra.product', 'Kasia Wójcik': 'kasia.dataviz', 'Eleanor Brooks': 'eleanor.uxwrite',
    'Leo Davies': 'leo.reels', 'Christian Wessner': 'christian.docs', 'Sarah Jenkins': 'sarah.copy',
};

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is required in .env');
    process.exit(1);
}

async function updateAvatars() {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ Connected.\n');

    let updated = 0;
    let skipped = 0;

    for (const item of RAW_SERVICES_DATA) {
        const username = item.meta.name;
        const avatar_url = item.meta.avatar_url;
        let freelancer = await Freelancer.findOne({ name: username });
        if (!freelancer) {
            const legacyName = Object.keys(LEGACY_NAME_TO_USERNAME).find((k) => LEGACY_NAME_TO_USERNAME[k] === username);
            if (legacyName) freelancer = await Freelancer.findOne({ name: legacyName });
        }
        if (!freelancer) {
            console.log(`⚠️  No freelancer found for: ${username}`);
            skipped++;
            continue;
        }
        const updates: { avatarUrl?: string; name?: string } = {};
        if (freelancer.avatarUrl !== avatar_url) updates.avatarUrl = avatar_url;
        if (freelancer.name !== username) updates.name = username;
        if (Object.keys(updates).length === 0) {
            skipped++;
            continue;
        }
        await Freelancer.updateOne({ _id: freelancer._id }, { $set: updates });
        console.log(`✅ ${freelancer.name} → ${username}${updates.avatarUrl ? `, avatar updated` : ''}`);
        updated++;
    }

    console.log(`\n📊 Done. Updated: ${updated}, Skipped: ${skipped}`);
    await mongoose.disconnect();
    process.exit(0);
}

updateAvatars().catch((e) => {
    console.error(e);
    process.exit(1);
});
