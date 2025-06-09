import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 4000;
const JWT_SECRET = 'clave_secreta_para_jwt';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Conexión a MongoDB
try {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.oqyfvty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log('Conectado a MongoDB Atlas');
} catch (error) {
  console.error('Error conectando a MongoDB:', error);
  process.exit(1);
}

// Modelo de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
});
const User = mongoose.model('User', userSchema);

// Middleware para proteger rutas
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

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(409).json({ message: 'El usuario ya existe' });

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid)
    return res.status(401).json({ message: 'Usuario o contraseña inválidos' });

  const token = jwt.sign(
    { username: user.username, id: user._id },
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
