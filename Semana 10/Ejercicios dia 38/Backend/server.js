import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json({ limit: '10mb' })); // Para leer JSON y soportar imágenes base64 grandes

// Rutas públicas y protegidas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Ruta raíz para test rápido
app.get('/', (req, res) => {
  res.send('API Blog funcionando 🚀');
});

// Conexión a MongoDB y arranque servidor
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  });
