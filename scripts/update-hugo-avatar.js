async function update() {
    try {
        const [{ default: mongoose }, dotenv] = await Promise.all([
            import('mongoose'),
            import('dotenv')
        ]);
        dotenv.config();

        const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;
        const FreelancerSchema = new mongoose.Schema({
            name: String,
            avatarUrl: String
        }, { collection: 'freelancers' });
        const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', FreelancerSchema);

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
