import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;


let cachedClient = null;
async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, password, type } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const users = db.collection('users');

    if (type === 'signup') {
      const exists = await users.findOne({ email });
      if (exists) return res.status(400).json({ error: 'Email already in use' });
      const hashedPassword = await bcrypt.hash(password, 10);
      await users.insertOne({ email, password: hashedPassword });
      const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else if (type === 'signin' || type === 'login') {
      const user = await users.findOne({ email });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      // Compare hashed password
      const valid = await bcrypt.compare(password, user.password);
      console.log(valid);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    }
    return res.status(400).json({ error: 'Invalid type' });
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}