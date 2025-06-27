import { useState, useEffect } from 'react';

import './App.css';
import fetchAllPokemon from './services/api';
import type { PokemonType } from './types/pokemon';
import PokemonGrid from './components/PokemonGrid';
import PokemonTable from './components/PokemonTable';
import PokemonModal from './components/PokemonModal';
import Loader from './components/Loader';
import SwitchButton from './components/ui/SwitchButton';

function App() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        const pokemon = await fetchAllPokemon();
        setPokemons(pokemon);
      } finally {
        setIsLoading(false);
      }
    }
    loadPokemon();
  }, []);

  return (
    <div className="app">
      <img
        src="pokemon-logo-2.png"
        className="mx-auto max-w-[300px] w-full"
        alt="Pokemon Logo"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative">
          {viewMode === 'grid' ? (
            <>
              <SwitchButton
                onClick={() => setViewMode('table')}
                textButton="Switch to Table View"
              />
              <PokemonGrid pokemons={pokemons} onSelect={setSelectedPokemon} />
            </>
          ) : (
            <>
              <SwitchButton
                onClick={() => setViewMode('grid')}
                textButton="Switch to Grid View"
              />
              <PokemonTable pokemons={pokemons} onSelect={setSelectedPokemon} />
            </>
          )}
        </div>
      )
      }
      {
        selectedPokemon && (
          <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
        )
      }
    </div >
  )
}

export default App
