import { verifyToken } from '@/lib/auth';

export default function handler(req, res) {
  try {
    const decoded = verifyToken(req);
    res.status(200).json({ message: 'Acceso permitido', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o ausente' });
  }
}
