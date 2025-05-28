const http = require('http');

const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});

const puerto = 3000;
servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
