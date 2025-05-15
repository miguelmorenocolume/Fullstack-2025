import React, { useState, useEffect } from 'react';

const API_KEY = '593009fd43179bac6e303934635cbdbb';

function App() {
  const [ciudad, setCiudad] = useState('Sevilla,ES');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Función para obtener datos del clima
  const obtenerClima = async () => {
    if (!ciudad.trim()) {
      setError('Por favor, introduce una ciudad válida.');
      return;
    }

    try {
      setCargando(true);
      setError('');
      setClima(null);

      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!respuesta.ok) {
        throw new Error('Ciudad no encontrada.');
      }

      const datos = await respuesta.json();
      setClima(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Actualizar cuando cambia la ciudad
  useEffect(() => {
    obtenerClima();
  }, [ciudad]);

  // Actualizar cada 5 minutos automáticamente
  useEffect(() => {
    const intervalo = setInterval(() => {
      obtenerClima();
    }, 300000); // 5 minutos

    return () => clearInterval(intervalo); // Evita fugas de memoria
  }, []);

  // Manejar input
  const manejarCambio = (e) => setCiudad(e.target.value);

  // Enter para buscar
  const manejarTecla = (e) => {
    if (e.key === 'Enter') obtenerClima();
  };

  return (
    <div id="root">
      <h1>Aplicación del Clima</h1>

      <input
        type="text"
        value={ciudad}
        onChange={manejarCambio}
        onKeyDown={manejarTecla}
        placeholder="Introduce una ciudad"
      />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={() => obtenerClima()}>Buscar</button>
        <button onClick={() => obtenerClima()}>Actualizar</button>
      </div>

      {cargando && <p>Cargando datos...</p>}S

      {error && <p className="error">{error}</p>}

      {clima && (
        <div className="clima-info">
          <h2>Clima en {clima.name}</h2>
          <p>🌡️ Temperatura: {clima.main.temp} °C</p>
          <p>💧 Humedad: {clima.main.humidity} %</p>
          <p>📝 Descripción: {clima.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
