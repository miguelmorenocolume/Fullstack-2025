import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('authMiddleware - No hay header de autorización');
      return res.status(401).json({ message: 'No autorizado, falta token' });
    }

    const token = authHeader.split(' ')[1]; // Espera formato "Bearer token"

    if (!token) {
      console.log('authMiddleware - Token no encontrado en header');
      return res.status(401).json({ message: 'No autorizado, falta token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      console.log('authMiddleware - Token inválido o sin id');
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = { userId: decoded.id };
    next();
  } catch (error) {
    console.error('authMiddleware - Error verificando token:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;
