const fs = require('fs');

const mensaje = 'Hola soy Miguel';

const nombreArchivo = 'mensaje.txt';

fs.writeFile(nombreArchivo, mensaje, (err) => {
  if (err) {
    console.error('Error al escribir el archivo:', err);
    return;
  }
  console.log(`Archivo '${nombreArchivo}' creado con éxito`);
});
