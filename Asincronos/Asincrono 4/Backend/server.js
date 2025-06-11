// server.js
import app from './api/index.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
