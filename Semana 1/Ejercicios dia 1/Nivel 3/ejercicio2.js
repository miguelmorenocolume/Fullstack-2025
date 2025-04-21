const readline = require('readline');

const interfaz = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interfaz.question('Ingrese el primer número: ', (numero1) => {
    interfaz.question('Ingrese el segundo número: ', (numero2) => {
        console.log(`${numero1} + ${numero2} = ${parseFloat(numero1) + parseFloat(numero2)}`);
        interfaz.close();
    });
});
