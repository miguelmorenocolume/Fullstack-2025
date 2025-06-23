import { connectDB } from '../../lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });

    await connectDB();
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}
