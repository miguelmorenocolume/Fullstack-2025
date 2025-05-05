import React from 'react';
import ArticuloCard from './ArticuloCard';

const ArticulosDestacados = ({ articulos }) => {
  const articulosFiltrados = articulos.filter(articulo => articulo.destacado);

  return (
    <div>
      <h2>Artículos Destacados</h2>
      {articulosFiltrados.length === 0 ? (
        <p>No hay artículos destacados.</p>
      ) : (
        articulosFiltrados.map((articulo, index) => (
          <ArticuloCard
            key={index}
            titulo={articulo.titulo}
            contenido={articulo.descripcion}
          />
        ))
      )}
    </div>
  );
};

export default ArticulosDestacados;
