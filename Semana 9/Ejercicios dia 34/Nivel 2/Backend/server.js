const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const SECRET = 'mi_clave_secreta_super_segura';

app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, email: 'miguel@gmail.com', password: '1234', isAdmin: false },
  { id: 2, email: 'admin@gmail.com', password: 'admin123', isAdmin: true }
];

// ✅ Primero definimos el middleware requireAuth
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// ✅ Ahora sí, definimos las rutas que usan requireAuth
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/admin', requireAuth, (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Acceso denegado. Requiere rol de administrador.' });
  }
  res.json({ mensaje: `Hola Admin ${req.user.email}, accediste a la zona restringida.` });
});

app.get('/api/protegido', requireAuth, (req, res) => {
  res.json({ mensaje: `Hola ${req.user.email}, accediste al contenido protegido.` });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
