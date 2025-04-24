const array = [10, 20, 30, 40, 50];

array.forEach((valor, index) => {
    const valorNuevo = valor + 5;
    console.log(`Posición ${index}: ${valorNuevo}`);
});