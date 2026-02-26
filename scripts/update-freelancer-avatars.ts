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
        const { name, avatar_url } = item.meta;
        const freelancer = await Freelancer.findOne({ name });
        if (!freelancer) {
            console.log(`⚠️  No freelancer found for: ${name}`);
            skipped++;
            continue;
        }
        if (freelancer.avatarUrl === avatar_url) {
            skipped++;
            continue;
        }
        await Freelancer.updateOne({ _id: freelancer._id }, { $set: { avatarUrl: avatar_url } });
        console.log(`✅ ${name}: ${freelancer.avatarUrl} → ${avatar_url}`);
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
