import express from 'express';
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:postId', getCommentsByPost); // Público
router.post('/', protect, createComment); // Crear (autenticado)
router.put('/:commentId', protect, updateComment); // Editar (autenticado y autor)
router.delete('/:commentId', protect, deleteComment); // Eliminar (autenticado y autor)

export default router;
