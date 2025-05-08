import React, { useState, useEffect } from 'react';

function Temporizador() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <h1>Segundos transcurridos: {segundos}</h1>
    </div>
  );
}

export default Temporizador;
