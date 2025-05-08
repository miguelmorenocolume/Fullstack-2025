import React, { useState, useEffect } from 'react';

function DatosAPI() {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((res) => res.json())
      .then((data) => setPokemones(data.results))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div>
      <h1>Pokemon</h1>
      <ul>
        {pokemones.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DatosAPI;
