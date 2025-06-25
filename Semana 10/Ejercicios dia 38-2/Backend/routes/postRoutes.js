import express from 'express';
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los posts (público)
router.get('/', getAllPosts);

// Crear post (requiere autenticación)
router.post('/', protect, createPost);

// Editar post (requiere autenticación y ser el autor)
router.put('/:postId', protect, updatePost);

// Eliminar post (requiere autenticación y ser el autor)
router.delete('/:postId', protect, deletePost);

export default router;
