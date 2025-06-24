import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

// Crear, editar y eliminar comentarios solo autenticados
router.post('/', authMiddleware, createComment);
router.put('/', authMiddleware, updateComment);
router.delete('/', authMiddleware, deleteComment);

export default router;
