import React from 'react';
import './articulocard.css'; 

const ArticuloCard = ({ titulo, contenido }) => {
  return (
    <div className="articulo-card">
      <h3>{titulo}</h3>
      <p>{contenido}</p>
    </div>
  );
};

export default ArticuloCard;
