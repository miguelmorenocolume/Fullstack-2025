const express = require('express');
const connectDB = require('./connections/db');

const app = express();
connectDB();

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
