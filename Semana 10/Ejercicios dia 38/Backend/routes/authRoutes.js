import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // tu middleware para proteger rutas

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta para obtener el usuario actual (requiere token)
router.get('/me', protect, async (req, res) => {
  try {
    // req.user ya viene de tu middleware protect con el id del usuario
    const user = await req.user; // Si req.user ya tiene el usuario completo
    // Si req.user es solo el id, debes buscar el usuario en la DB:
    // const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;
