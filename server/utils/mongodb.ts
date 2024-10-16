import { MongoClient, Db, Collection } from 'mongodb';
const config = useRuntimeConfig();

const MONGODB_URI = config.public.MONGODB_URI!;
const MONGODB_DB = 'rotary_db';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connect(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to MongoDB');
  }
}

export async function getDatabase(client: MongoClient): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const db = client.db(MONGODB_DB);
  cachedDb = db;
  return db;
}

export async function getCollection<T>(db: Db, collectionName: string): Promise<Collection> {
  return db.collection(collectionName);
}