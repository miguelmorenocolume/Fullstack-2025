import React from 'react';
import './ListaFrutas.css';

const ListaFrutas = ({ frutas }) => {
  return (
    <div>
      <h2>Total de frutas: {frutas.length}</h2>
      <ul>
        {frutas.map((fruta, index) => (
          <li key={index}>{fruta}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFrutas;
