
import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  const [activo, setActivo] = useState(false);
  const [esPantallaPequena, setEsPantallaPequena] = useState(window.innerWidth < 600);

  useEffect(() => {
    const manejarResize = () => {
      setEsPantallaPequena(window.innerWidth < 600);
    };
    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, []);

  const estiloBase = {
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px'
  };

  const estiloBoton = {
    ...estiloBase,
    backgroundColor: activo ? 'green' : 'gray'
  };

  const estiloTexto = {
    color: esPantallaPequena ? 'red' : 'blue',
    fontSize: '20px'
  };

  return (
    <div>
      <button style={estiloBoton} onClick={() => setActivo(!activo)}>
        {activo ? 'Activo' : 'Inactivo'}
      </button>
      <p style={estiloTexto}>
        {esPantallaPequena ? 'Pantalla pequeña' : 'Pantalla grande'}
      </p>
    </div>
  );
}

export default App;
