function elevarNumero(numero) {
    if (numero < 0) {
        return "El número debe ser mayor o igual a cero";
    }
    return Math.pow(numero, numero);
}

console.log(elevarNumero(2));
console.log(elevarNumero(3)); 