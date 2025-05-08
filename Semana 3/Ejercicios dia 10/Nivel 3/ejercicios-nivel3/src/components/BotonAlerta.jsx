import React from 'react';

function BotonAlerta() {
  const mostrarAlerta = () => {
    alert('¡Hiciste clic en el botón!');
  };

  return (
    <button onClick={mostrarAlerta}>
      Haz clic aquí
    </button>
  );
}

export default BotonAlerta;
