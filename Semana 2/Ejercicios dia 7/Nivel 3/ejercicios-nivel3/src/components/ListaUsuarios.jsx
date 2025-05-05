import React from 'react';

const ListaUsuarios = ({ usuarios }) => {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios disponibles.</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.nombre}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaUsuarios;
