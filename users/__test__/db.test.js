// db.test.js

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const uri = process.env.mongoDbUrl || 'mongodb://localhost:27017/myapp'; // your MongoDB URI
let client;

async function connect() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db();
}

async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}





let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  process.env.MONGODB_URI = uri;
});

afterAll(async () => {
  await close();
  await mongoServer.stop();
});

describe('MongoDB connection', () => {
  test('connects to MongoDB', async () => {
    const db = await connect();
    const collections = await db.listCollections().toArray();
    expect(collections).toEqual([]);
  });
});
