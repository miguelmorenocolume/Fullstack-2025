function calcularAreaTrianguloRectangulo(alto, ancho) {
    if (alto <= 0 || ancho <= 0) {
        throw new Error("El alto y el ancho deben ser mayores a 0");
    }
    return (alto * ancho) / 2;
}

try {
    const area = calcularAreaTrianguloRectangulo(5, 10);
    console.log(`El área del triángulo es: ${area}`);
} catch (error) {
    console.error(error.message);
}