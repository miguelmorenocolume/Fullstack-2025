const express = require('express');
const app = express();

let contadorSolicitudes = 0;

app.use((req, res, next) => {
  contadorSolicitudes++;
  console.log(`Solicitudes recibidas: ${contadorSolicitudes}`);
  next();
});

app.use((req, res, next) => {
  const inicio = Date.now();

  res.on('finish', () => {
    const duracion = Date.now() - inicio;
    console.log(`Tiempo de procesamiento: ${duracion}ms para ${req.method} ${req.originalUrl}`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.get('/demo', (req, res) => {
  setTimeout(() => {
    res.send('Ruta demo con retraso simulado.');
  }, 500); 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
