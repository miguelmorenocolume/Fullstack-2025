import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();

  const { email, password, role = 'user' } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Usuario ya existe' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });

    return res.status(201).json({ message: 'Usuario creado', user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error('Error al registrar:', err);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}
