let nombres = [];
let contador = 1;

export function obtenerNombres() {
  return nombres;
}

export function agregarNombre(nombre) {
  const nuevo = { id: contador++, nombre };
  nombres.push(nuevo);
  return nuevo;
}

export function eliminarNombre(id) {
  const index = nombres.findIndex(n => n.id === id);
  if (index !== -1) {
    nombres.splice(index, 1);
    return true;
  }
  return false;
}
