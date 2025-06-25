import { useState, useEffect } from 'react';

import './App.css';
import './components/styles.css';
import fetchAllPokemon from './services/api';
import PokemonGrid from './components/PokemonGrid';
import type { PokemonType } from './types/pokemon';

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemon = await fetchAllPokemon();
      setPokemons(pokemon);
    }
    loadPokemon();
  }, [])

  return (
    <div className="app">
      <h1 className="font-bold">Pokémon Grid</h1>
      <PokemonGrid pokemons={pokemons} />
    </div>
  )
}

export default App
