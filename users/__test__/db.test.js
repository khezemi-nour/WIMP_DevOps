// db.test.js

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env' )});

const uri = process.env.mongoDbUrl || 'mongodb://root:example@localhost:27017/test'; // your MongoDB URI
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
  process.env.mongoDbUrl = await mongoServer.getUri();
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
