import React, { useState, useEffect } from 'react';

function DetectarTecla() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Enter') {
        setMensaje('¡Presionaste Enter!');
      }
    };

    window.addEventListener('keydown', manejarTecla);

    return () => window.removeEventListener('keydown', manejarTecla); 
  }, []);

  return (
    <div>
      <h1>Presiona "Enter"</h1>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default DetectarTecla;
