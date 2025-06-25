import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rutas públicas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // posts públicos para GET

// Rutas protegidas
app.use('/api/comments', authMiddleware, commentRoutes);

// Ruta raíz para test rápido
app.get('/', (req, res) => {
  res.send('API Blog funcionando 🚀');
});

// Conexión a MongoDB y arranque servidor
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
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
