import { useState, useEffect } from 'react';

import './App.css';
import fetchAllPokemon from './services/api';
import type { PokemonType } from './types/pokemon';
import PokemonGrid from './components/PokemonGrid';
import PokemonTable from './components/PokemonTable';
import PokemonModal from './components/PokemonModal';

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemon = await fetchAllPokemon();
      setPokemons(pokemon);
    }
    loadPokemon();
  }, [])

  return (
    <div className="app">
      <h1 className="font-bold">Pokémons </h1>
      <PokemonTable pokemons={pokemons} onSelect={setSelectedPokemon} />
      <PokemonGrid pokemons={pokemons} onSelect={setSelectedPokemon} />
      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </div>
  )
}

export default App
