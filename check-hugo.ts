import { connectMongo } from './src/lib/db';
import { Freelancer } from './src/models/Freelancer';
import mongoose from 'mongoose';

async function checkHugo() {
    try {
        await connectMongo();
        const hugo = await Freelancer.findOne({ name: 'Hugo Martins' }).lean();
        console.log('Hugo Martins Data:', JSON.stringify(hugo, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkHugo();
