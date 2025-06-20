import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  const user = verifyToken(req, res);
  if (!user) return;

  res.json({ message: 'Contenido protegido', user });
}
