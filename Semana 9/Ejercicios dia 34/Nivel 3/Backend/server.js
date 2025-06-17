const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
const SECRET = 'mi_clave_secreta_super_segura';

app.use(cors());
app.use(bodyParser.json());

let users = [
  { id: 1, email: 'miguel@gmail.com', password: '1234', isAdmin: false },
  { id: 2, email: 'admin@gmail.com', password: 'admin123', isAdmin: true }
];

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Acceso denegado, solo admins' });
  }
  next();
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/api/users', requireAuth, requireAdmin, (req, res) => {
  res.json(users.map(({password, ...u}) => u)); 
});

app.post('/api/users', requireAuth, requireAdmin, (req, res) => {
  const { email, password, isAdmin = false } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email ya existe' });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    email,
    password,
    isAdmin
  };
  users.push(newUser);
  const { password: p, ...userWithoutPass } = newUser;
  res.status(201).json(userWithoutPass);
});

app.put('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { email, password, isAdmin } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  if (email) user.email = email;
  if (password) user.password = password;
  if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

  const { password: p, ...userWithoutPass } = user;
  res.json(userWithoutPass);
});

app.delete('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  users.splice(index, 1);
  res.json({ mensaje: 'Usuario eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
