const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const FreelancerSchema = new mongoose.Schema({
    name: String,
    avatarUrl: String
}, { collection: 'freelancers' });

const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', FreelancerSchema);

async function update() {
    try {
        await mongoose.connect(MONGODB_URI);
        const result = await Freelancer.updateOne(
            { name: "Hugo Martins" },
            { $set: { avatarUrl: "/avatars/hugo-pt.jpg?v=1" } }
        );
        console.log('Update result:', result);
    } catch (e) {
        console.error('Error updating Hugo avatar:', e);
    } finally {
        await mongoose.connection.close();
    }
}

update();
