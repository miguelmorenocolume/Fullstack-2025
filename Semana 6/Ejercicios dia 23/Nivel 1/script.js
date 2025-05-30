const express = require('express');
const app = express();

// Middleware 1: Registrar fecha y URL
app.use((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
  next(); // Continuar con el siguiente middleware
});

// Middleware 2: Verificar autenticación por token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']; // Normalmente 'Authorization: Bearer TOKEN'

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  // Aquí podrías validar el token si fuera JWT, etc.
  // Simulación simple:
  if (token === 'Bearer mi-token-secreto') {
    next(); // Token válido, continuar
  } else {
    return res.status(403).json({ error: 'Token inválido.' });
  }
};

// Ruta protegida
app.get('/protegido', verificarToken, (req, res) => {
  res.send('Acceso concedido a la ruta protegida.');
});

// Ruta pública
app.get('/', (req, res) => {
  res.send('Ruta pública, no requiere autenticación.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
