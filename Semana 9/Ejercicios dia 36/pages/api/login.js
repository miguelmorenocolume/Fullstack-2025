import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
}
