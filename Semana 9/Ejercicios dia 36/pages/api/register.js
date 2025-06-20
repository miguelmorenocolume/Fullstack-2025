// pages/api/register.js
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });

  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Usuario ya existe' });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role: 'user',
  });

  return res.status(201).json({ message: 'Usuario creado', user: { email: user.email } });
}
