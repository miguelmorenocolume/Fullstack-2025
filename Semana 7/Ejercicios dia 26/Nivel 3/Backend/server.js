import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Middleware autenticación
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Usuario y contraseña obligatorios' });

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser)
    return res.status(409).json({ message: 'El usuario ya existe' });

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { username, passwordHash }
  });

  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user)
    return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid)
    return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

  const token = jwt.sign(
    { username: user.username, id: user.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

// Ruta protegida
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido al dashboard, ${req.user.username}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
