import jwt from 'jsonwebtoken';

export function verifyToken(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Token requerido');

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    res.status(401).json({ error: 'No autorizado' });
    return null;
  }
}
