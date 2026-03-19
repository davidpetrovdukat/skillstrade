async function run() {
    const { MongoClient } = await import('mongodb');
    const uri = "mongodb://localhost:27017/skillstrade"; // Adjust if needed
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('skillstrade');
        const freelancers = database.collection('freelancers');
        const query = { name: "Hugo Martins" };
        const hugo = await freelancers.findOne(query);
        console.log("HUGO_START");
        console.log(JSON.stringify(hugo));
        console.log("HUGO_END");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
