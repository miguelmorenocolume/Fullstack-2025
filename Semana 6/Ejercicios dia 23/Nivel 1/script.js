const express = require('express');
const app = express();

app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
  next();
});


const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  if (token === 'Bearer mi-token-secreto') {
    next(); 
  } else {
    return res.status(403).json({ error: 'Token inválido.' });
  }
};

app.get('/protegido', verificarToken, (req, res) => {
  res.send('Acceso concedido a la ruta protegida.');
});

app.get('/', (req, res) => {
  res.send('Ruta pública, no requiere autenticación.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
