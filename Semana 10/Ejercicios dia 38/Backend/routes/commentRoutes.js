import express from 'express';
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:postId', getCommentsByPost);
router.post('/', protect, createComment);
router.put('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);

export default router;
