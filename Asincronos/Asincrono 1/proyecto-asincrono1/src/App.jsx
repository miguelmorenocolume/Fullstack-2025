import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  // Estado para guardar la lista de Pokémon
  const [pokemons, setPokemons] = useState([]);
  // Estado para saber si está cargando la información
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una vez al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener los Pokémon
    const fetchPokemons = async () => {
      try {
        // Se pide la lista de los primeros 151 Pokémon
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();

        // Por cada Pokémon, se pide su información detallada
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        // Se guarda la lista completa en el estado
        setPokemons(detailedPokemons);
      } catch (error) {
        // Si hay error, se muestra en consola
        console.error('Error al obtener los Pokémon:', error);
      } finally {
        // Al final, se indica que ya no está cargando
        setLoading(false);
      }
    };

    // Se llama a la función para obtener los Pokémon
    fetchPokemons();
  }, []);

  return (
    <div className="app">
      <h1>Galería Pokémon</h1>
      {/* Si está cargando, muestra mensaje. Si no, muestra la galería */}
      {loading ? <p>Cargando Pokémon...</p> : <Gallery pokemons={pokemons} />}
    </div>
  );
}

export default App;