import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

// Listado público
router.get('/', getPosts);

// Creación, actualización y eliminación requieren autenticación
router.post('/', authMiddleware, createPost);
router.put('/', authMiddleware, updatePost);
router.delete('/', authMiddleware, deletePost);

export default router;
