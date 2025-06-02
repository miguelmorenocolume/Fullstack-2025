const express = require('express');
const app = express();

const ipBloqueada = '192.168.1.100';

app.use((req, res, next) => {
  const ipCliente = req.ip || req.connection.remoteAddress;

  if (ipCliente.includes(ipBloqueada)) {
    return res.status(403).json({ error: 'Acceso denegado desde esta IP.' });
  }

  next();
});

app.get('/error', (req, res, next) => {
  const error = new Error('Algo salió mal intencionalmente.');
  next(error); 
});

// Ruta normal
app.get('/', (req, res) => {
  res.send('Ruta pública sin errores.');
});

app.use((err, req, res, next) => {
  console.error('Error detectado:', err.message);

  res.status(500).json({
    error: 'Error interno del servidor',
    mensaje: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
