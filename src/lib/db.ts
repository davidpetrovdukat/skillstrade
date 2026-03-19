import mongoose from "mongoose";

const MONGODB_URI = (() => {
    const value = process.env.MONGODB_URI || process.env.DATABASE_URL;

    if (!value) {
        throw new Error("MongoDB connection string is missing. Set MONGODB_URI or DATABASE_URL.");
    }

    return value;
})();

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache ?? (global.mongooseCache = {
    conn: null,
    promise: null,
});

export async function connectMongo() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
