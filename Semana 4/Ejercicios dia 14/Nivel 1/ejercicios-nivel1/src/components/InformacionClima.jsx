import React from 'react';

const InformacionClima = ({ clima }) => {
  return (
    <div className="informacion-clima">
      <h2>Clima en {clima.name}</h2>
      <p>Temperatura: {clima.main.temp} °C</p>
      <p>Humedad: {clima.main.humidity} %</p>
      <p>Descripción: {clima.weather[0].description}</p>
    </div>
  );
};

export default InformacionClima;
