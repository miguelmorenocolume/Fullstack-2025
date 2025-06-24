import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Registro y login no requieren auth
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
