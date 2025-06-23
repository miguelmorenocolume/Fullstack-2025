import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('Token no proporcionado');

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}
