import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI in .env.local first');
const client = new MongoClient(process.env.MONGODB_URI);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || 'portfolio');
  for (const name of ['profile', 'projects', 'experience', 'education', 'technologies', 'achievements', 'socials']) {
    // Creating indexes also creates missing collections. Never inserts personal or sample data.
    await db.collection(name).createIndex({ id: 1 }, { unique: true });
    if (name !== 'profile') await db.collection(name).createIndex({ order: 1, id: 1 });
    console.log(`Ready: ${name}`);
  }
  console.log('Collections and indexes are ready.');
} finally { await client.close(); }
