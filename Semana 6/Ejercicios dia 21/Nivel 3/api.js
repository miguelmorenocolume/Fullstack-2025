const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const basePath = './archivos/';

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

app.get('/archivo/:nombre', (req, res) => {
  const nombreArchivo = req.params.nombre;
  const ruta = basePath + nombreArchivo;

  fs.readFile(ruta, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }
    res.send(data);
  });
});

app.post('/archivo/:nombre', (req, res) => {
  const nombreArchivo = req.params.nombre;
  const contenido = req.body.contenido;
  const ruta = basePath + nombreArchivo;

  if (typeof contenido !== 'string') {
    return res.status(400).json({ error: 'El contenido debe ser una cadena de texto' });
  }

  fs.writeFile(ruta, contenido, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error escribiendo el archivo' });
    }
    res.json({ mensaje: 'Archivo guardado correctamente' });
  });
});

app.delete('/archivo/:nombre', (req, res) => {
  const nombreArchivo = req.params.nombre;
  const ruta = basePath + nombreArchivo;

  fs.unlink(ruta, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Archivo no encontrado o no se pudo eliminar' });
    }
    res.json({ mensaje: 'Archivo eliminado correctamente' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
