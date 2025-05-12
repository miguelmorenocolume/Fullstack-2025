import { useState } from 'react';
import './ListaInteractiva.css';

function ListaInteractiva() {
  const elementosIniciales = [
    { id: 1, texto: 'Elemento 1', activo: false },
    { id: 2, texto: 'Elemento 2', activo: false },
    { id: 3, texto: 'Elemento 3', activo: false },
  ];

  const [elementos, setElementos] = useState(elementosIniciales);

  const manejarClick = (id) => {
    const nuevosElementos = elementos.map((el) =>
      el.id === id
        ? {
            ...el,
            activo: !el.activo,
            texto: el.activo ? `Elemento ${el.id}` : `¡Clicado ${el.id}!`,
          }
        : el
    );
    setElementos(nuevosElementos);
  };

  return (
    <ul className="lista">
      {elementos.map((el) => (
        <li
          key={el.id}
          className={el.activo ? 'item activo' : 'item'}
          onClick={() => manejarClick(el.id)}
        >
          {el.texto}
        </li>
      ))}
    </ul>
  );
}

export default ListaInteractiva;
