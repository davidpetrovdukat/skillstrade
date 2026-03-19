async function check() {
    try {
        const [{ default: mongoose }, dotenv] = await Promise.all([
            import('mongoose'),
            import('dotenv')
        ]);
        dotenv.config();

        const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;
        const FreelancerSchema = new mongoose.Schema({
            name: String,
            avatarUrl: String,
            slug: String
        }, { collection: 'freelancers' });
        const Freelancer = mongoose.models.Freelancer || mongoose.model('Freelancer', FreelancerSchema);

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
