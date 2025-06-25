import express from 'express';
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getPostById,
  addComment
} from '../controllers/postController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los posts (público)
router.get('/', getAllPosts);

// Obtener post por ID (público)
router.get('/:postId', getPostById);

// Crear post (requiere autenticación)
router.post('/', protect, createPost);

// Editar post (requiere autenticación y ser el autor)
router.put('/:postId', protect, updatePost);

// Eliminar post (requiere autenticación y ser el autor)
router.delete('/:postId', protect, deletePost);

// Ruta para añadir comentario
router.post('/:postId/comments', protect, addComment);

export default router;
