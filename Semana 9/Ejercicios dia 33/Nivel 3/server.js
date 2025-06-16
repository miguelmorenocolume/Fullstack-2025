const express = require('express');
const { port, dbUri, envName } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send(`Entorno: ${envName}, DB: ${dbUri}`);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} (${envName})`);
});
