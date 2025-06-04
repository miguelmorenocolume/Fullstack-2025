import React from 'react';
import PhotoCard from './PhotoCard';

// Componente que muestra una galería de tarjetas de Pokémon
// Recibe una lista de objetos Pokémon como prop
export default function Gallery({ pokemons }) {
    return (
        <div className="gallery">
            {pokemons.map((pokemon) => (
                <PhotoCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}
