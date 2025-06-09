import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Inicialización de la aplicación Express
const app = express();

// Puerto en el que correrá el servidor
const PORT = 4000;

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = 'clave_secreta_para_jwt';

// Middleware para permitir peticiones desde el frontend (CORS)
app.use(cors({
  origin: 'http://localhost:5173', // Asegura que solo el frontend puede hacer peticiones
  credentials: true, // Permite envío de cookies o headers de autenticación
}));

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Conexión a la base de datos MongoDB Atlas
try {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.oqyfvty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  console.log('Conectado a MongoDB Atlas');
} catch (error) {
  console.error('Error conectando a MongoDB:', error);
  process.exit(1); // Sale del proceso si falla la conexión
}

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // Nombre de usuario único
  passwordHash: String, // Contraseña encriptada
});

// Creación del modelo basado en el esquema
const User = mongoose.model('User', userSchema);

// Middleware para verificar el token en rutas protegidas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Header: Authorization: Bearer <token>
  const token = authHeader?.split(' ')[1]; // Extrae el token
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  // Verifica el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user; // Guarda la info del usuario en la request
    next(); // Continúa a la siguiente función
  });
}

// Ruta de registro de nuevos usuarios
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación básica
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña obligatorios' });
    }

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Encripta la contraseña y guarda el nuevo usuario
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ message: 'Error interno al registrar' });
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busca el usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }

    // Compara contraseñas
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }

    // Crea un token con info del usuario
    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token }); // Envía el token al frontend
  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
});

// Ruta protegida (requiere token válido)
app.get('/dashboard', authenticateToken, (req, res) => {
  try {
    // Si el token es válido, devuelve un mensaje personalizado
    res.json({ message: `Bienvenido al dashboard, ${req.user.username}` });
  } catch (error) {
    console.error('Error en /dashboard:', error);
    res.status(500).json({ message: 'Error al cargar el dashboard' });
  }
});

// Inicio del servidor en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
