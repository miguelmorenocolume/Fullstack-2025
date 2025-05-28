const fs = require('fs');

const readStream = fs.createReadStream('info.txt',);

readStream.on('data', (chunk) => console.log(chunk.toString()))
readStream.on('end', () => console.log('Lectura finalizada'));
readStream.on('error', (err) => console.error(err));
