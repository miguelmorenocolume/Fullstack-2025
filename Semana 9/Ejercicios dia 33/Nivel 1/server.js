const express = require('express');
const { port, dbUri, nodeEnv } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send(`Entorno: ${nodeEnv}, Base de datos: ${dbUri}`);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} (${nodeEnv})`);
});
