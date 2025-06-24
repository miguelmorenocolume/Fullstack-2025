import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader);  // Log para verificar el header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado, token faltante o mal formado' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token recibido:', token);  // Log para verificar token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);  // Log para verificar contenido token

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;
