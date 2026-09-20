import 'server-only';
import { MongoClient } from 'mongodb';

const shared = globalThis as typeof globalThis & { mongoPromise?: Promise<MongoClient> };
export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MongoDB is not configured');
  // Reuse the connection pool across requests and development hot reloads.
  if (!shared.mongoPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 5000 });
    shared.mongoPromise = client.connect().catch((error: unknown) => { shared.mongoPromise = undefined; throw error; });
  }
  return (await shared.mongoPromise).db(process.env.MONGODB_DB || 'portfolio');
}
