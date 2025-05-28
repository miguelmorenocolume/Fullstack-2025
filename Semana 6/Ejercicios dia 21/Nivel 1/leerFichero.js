const fs = require('fs');

const rutaArchivo = './mensaje.txt';

fs.readFile(rutaArchivo, 'utf8', (err, data) => {
  if (err) {
    console.error('Error leyendo el archivo:', err);
    return;
  }
  console.log('Contenido del archivo:');
  console.log(data);
});
