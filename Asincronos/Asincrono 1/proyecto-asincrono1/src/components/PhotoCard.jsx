import React from 'react';

// Componente que muestra la tarjeta de un Pokémon
export default function PhotoCard({ pokemon }) {
    return (
        <div className="photo-card">
            {/* Imagen del Pokémon */}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} loading="lazy" />

            {/* Nombre del Pokémon con la primera letra en mayúscula */}
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>

            {/* Tipos del Pokémon */}
            <p>
                <strong>Tipo:</strong>{' '}
                {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
            </p>

            {/* Altura del Pokémon en metros */}
            <p>
                <strong>Altura:</strong> {pokemon.height / 10} m
            </p>

            {/* Peso del Pokémon en kilogramos */}
            <p>
                <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>

            {/* Primera habilidad del Pokémon */}
            <p>
                <strong>Habilidad:</strong> {pokemon.abilities[0]?.ability.name}
            </p>
        </div>
    );
}
