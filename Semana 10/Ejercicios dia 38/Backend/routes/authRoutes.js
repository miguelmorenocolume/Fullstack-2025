import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para obtener el usuario actual (requiere token)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
