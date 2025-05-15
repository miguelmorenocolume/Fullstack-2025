import React, { useState, useEffect } from 'react';

const API_KEY = '8208d9f024f2a356c0a65411df84f8d6';

function App() {
  const [ciudad, setCiudad] = useState('Sevilla,ES');
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

  // Buscar al cargar y cada vez que cambia la ciudad
  useEffect(() => {
    manejarBusqueda();
  }, [ciudad]);

  // Actualizar automáticamente cada 5 minutos
  useEffect(() => {
    const intervalo = setInterval(() => {
      manejarBusqueda();
    }, 300000); // 5 minutos

    return () => clearInterval(intervalo);
  }, []);

  // Manejar cambio de input
  const manejarCambioInput = (e) => {
    setCiudad(e.target.value);
  };

  // Buscar al pulsar Enter
  const manejarKeyPress = (e) => {
    if (e.key === 'Enter') {
      manejarBusqueda();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Aplicación del Clima</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={ciudad}
          onChange={manejarCambioInput}
          onKeyDown={manejarKeyPress}
          placeholder="Introduce una ciudad"
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={manejarBusqueda}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Buscar
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          {error}
        </p>
      )}

      {clima && (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h2>Clima en {clima.name}</h2>
          <p>Temperatura: {clima.main.temp} °C</p>
          <p>Humedad: {clima.main.humidity} %</p>
          <p>Descripción: {clima.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
