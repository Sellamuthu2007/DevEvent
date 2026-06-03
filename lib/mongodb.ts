import mongoose from "mongoose";

const envUri = process.env.MONGODB_URI;

if (!envUri) {
  throw new Error("MONGODB_URI is not set in the environment");
}
const MONGODB_URI: string = envUri;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Global cache prevents multiple connections during dev hot reloads.
const globalCache = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalCache.mongoose ?? {
  conn: null,
  promise: null,
};

globalCache.mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // Disable buffering so errors surface immediately.
        bufferCommands: false,
      })
      .then((connection) => connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
