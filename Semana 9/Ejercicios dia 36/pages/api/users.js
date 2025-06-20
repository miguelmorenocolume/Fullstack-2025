import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req, res) {
  const user = verifyToken(req, res);
  if (!user || user.role !== 'admin') return;

  await connectDB();
  const users = await User.find().select('-password');
  res.json({ users });
}
