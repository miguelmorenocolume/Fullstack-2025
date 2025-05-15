import React, { useState, useEffect } from 'react';
import BarraBusqueda from './components/BarraBusqueda';
import InformacionClima from './components/InformacionClima';
import MensajeError from './components/MensajeError';

const API_KEY = 'a4e41290621003585d2d0ee57115713e';

function App() {
  const [ciudad, setCiudad] = useState('Sevilla');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');

  const manejarBusqueda = async () => {
    if (!ciudad) return;

    try {
      setError('');
      setClima(null);

      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!respuesta.ok) {
        throw new Error('Ciudad no encontrada');
      }

      const datos = await respuesta.json();
      setClima(datos);
    } catch (err) {
      setError(err.message);
    }
  };

  // Ejecutar búsqueda al iniciar
  useEffect(() => {
    manejarBusqueda();
  }, []);

  return (
    <div className="app">
      <h1>Aplicación del Clima</h1>
      <BarraBusqueda ciudad={ciudad} setCiudad={setCiudad} manejarBusqueda={manejarBusqueda} />
      {error && <MensajeError mensaje={error} />}
      {clima && <InformacionClima clima={clima} />}
    </div>
  );
}

export default App;
