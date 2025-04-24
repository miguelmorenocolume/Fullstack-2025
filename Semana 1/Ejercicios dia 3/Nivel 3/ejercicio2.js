const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinado = [...array1, ...array2];
console.log('Array combinado:', combinado);

const original = [10, 20, 30];
const copia = [...original];
console.log('Copia del array:', copia);

const base = [100, 200];
const extendido = [...base, 300, 400];
console.log('Array extendido:', extendido);

const objeto1 = { a: 1, b: 2 };
const objeto2 = { c: 3, d: 4 };
const combinadoObjetos = { ...objeto1, ...objeto2 };
console.log('Objeto combinado:', combinadoObjetos);

const objetoOriginal = { x: 10, y: 20 };
const copiaObjeto = { ...objetoOriginal };
console.log('Copia del objeto:', copiaObjeto);
