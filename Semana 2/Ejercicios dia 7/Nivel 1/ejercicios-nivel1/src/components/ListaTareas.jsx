import React from 'react';

const ListaTareas = ({ tareas }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tareas.length === 0 ? (
        <p>No hay tareas pendientes.</p>
      ) : (
        <ul>
          {tareas.map((tarea, index) => (
            <li key={index}>{tarea.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaTareas;
