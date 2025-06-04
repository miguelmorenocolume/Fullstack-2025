import React, { useEffect, useState } from "react";

import "../styles/pokeList.css";

/**
 * Componente que muestra una lista de Pokémon obtenidos desde la PokeAPI.
 * Utiliza useEffect para cargar los datos al montar el componente.
 */
export default function PokeList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9", {
          signal: controller.signal,
        });
        const data = await response.json();

        const promises = data.results.map(async ({ name, url }) => {
          const res = await fetch(url);
          const details = await res.json();
          const { id, sprites, types, ...rest } = details;

          return {
            id,
            name,
            image: sprites.front_default,
            type: types[0]?.type?.name || "unknown",
            ...rest,
          };
        });

        const allPokemon = await Promise.all(promises);
        setPokemonList(allPokemon);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching Pokémon:", error);
        }
      }
    };

    fetchPokemon();
    return () => controller.abort();
  }, []);

  return (
    <div className="pokemon-container">
      <h2>Lista de Pokémon</h2>
      <div className="pokemon-grid">
        {pokemonList.map(({ id, name, image, type, ...rest }) => (
          <div className="poke-card" key={id}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>ID: {id}</p>
            <p>Tipo: {type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}