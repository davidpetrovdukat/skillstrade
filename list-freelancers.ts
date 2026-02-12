import { connectMongo } from './src/lib/db';
import { Freelancer } from './src/models/Freelancer';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

async function listFreelancers() {
    try {
        await connectMongo();
        const freelancers = await Freelancer.find({}).select('name avatarUrl slug').lean();
        console.log('FREELANCERS_START');
        console.log(JSON.stringify(freelancers, null, 2));
        console.log('FREELANCERS_END');
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

listFreelancers();
