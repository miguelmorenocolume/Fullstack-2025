// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const ORIGIN = process.env.ORIGIN;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  });

// Esquema y modelo
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
});
const User = mongoose.model('User', userSchema);

// Middleware autenticación
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rutas
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Usuario y contraseña obligatorios' });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(409).json({ message: 'El usuario ya existe' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

  const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido al dashboard, ${req.user.username}` });
});

// 👇 En lugar de app.listen
export default app;
