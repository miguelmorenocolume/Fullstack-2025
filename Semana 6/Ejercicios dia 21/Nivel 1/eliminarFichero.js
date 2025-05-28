const fs = require('fs');

const rutaArchivo = './mensaje.txt';

fs.unlink(rutaArchivo, (err) => {
  if (err) {
    console.error('Error eliminando el archivo:', err);
    return;
  }
  console.log('Archivo eliminado correctamente');
});
