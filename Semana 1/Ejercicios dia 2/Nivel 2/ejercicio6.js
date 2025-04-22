function calcularAreaCirculo(radio) {
    if (radio <= 0) {
        return "El radio debe ser un número positivo.";
    }
    const area = Math.PI * Math.pow(radio, 2);
    return area;
}

console.log(calcularAreaCirculo(5)); 