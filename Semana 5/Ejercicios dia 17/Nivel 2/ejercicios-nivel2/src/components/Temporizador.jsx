import React, { useState, useRef } from 'react';

const Temporizador = () => {
  const [segundos, setSegundos] = useState(0);
  const intervaloRef = useRef(null);

  const iniciar = () => {
    if (intervaloRef.current !== null) return;

    intervaloRef.current = setInterval(() => {
      setSegundos(prev => prev + 1);
    }, 1000);
  };

  const detener = () => {
    clearInterval(intervaloRef.current);
    intervaloRef.current = null;
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">{segundos} segundos</h1>
      <div className="space-x-2">
        <button
          onClick={iniciar}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Iniciar
        </button>
        <button
          onClick={detener}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Detener
        </button>
      </div>
    </div>
  );
};

export default Temporizador;
