function saludar(nombre) {
    console.log(`¡Hola, ${nombre}!`);
}

function procesarEntradaUsuario() {
    const nombre = prompt("Por favor, ingresa tu nombre:");
    saludar(nombre);
}

procesarEntradaUsuario();