import React from 'react';

const BarraBusqueda = ({ ciudad, setCiudad, manejarBusqueda }) => {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Introduce una ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />
      <button onClick={manejarBusqueda}>Buscar</button>
    </div>
  );
};

export default BarraBusqueda;
