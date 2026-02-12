const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const FreelancerSchema = new mongoose.Schema({
    name: String,
    avatarUrl: String,
    slug: String
}, { collection: 'freelancers' });

const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', FreelancerSchema);

async function check() {
    try {
        await mongoose.connect(MONGODB_URI);
        const all = await Freelancer.find({ name: /Hugo/i }).lean();
        console.log('--- HUGO MATCHES ---');
        console.log(JSON.stringify(all, null, 2));
        console.log('--------------------');
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.connection.close();
    }
}

check();
