import React, { useState } from 'react';

const ListaTareas = ({ tareas }) => {
  const [estadoTareas, setEstadoTareas] = useState(
    tareas.map(t => ({ ...t, completada: false }))
  );

  const cambiarEstado = (index) => {
    const nuevasTareas = [...estadoTareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setEstadoTareas(nuevasTareas);
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {estadoTareas.map((tarea, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => cambiarEstado(index)}
              />
              {tarea.nombre} - {tarea.completada ? '✅' : '❌'}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;
