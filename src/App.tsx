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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const allPokemon = await fetchAllPokemon();
        setPokemons(allPokemon);
        setFilteredPokemons(allPokemon);
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemon();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(pokemons);
      return;
    }

    const filtered = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
    );
    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

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
          <div className="flex justify-center gap-6 mb-6">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                name="search"
                placeholder="Search by name or ID"
                className="border border-gray-300 bg-white rounded px-4 py-2 pr-10 w-64"
                value={searchTerm}
                onChange={handleSearchChange}
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-white cursor-pointer p-2 bg-blue-500 outline-none hover:bg-blue-600 rounded"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          {viewMode === 'grid' ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {searchTerm
                    ? `Found ${filteredPokemons.length} Pokémon matching "${searchTerm}"`
                    : `Showing all ${filteredPokemons.length} Pokémon`}
                </h2>
                <SwitchButton
                  onClick={() => setViewMode('table')}
                  textButton="Switch to Table View"
                />
              </div>
              <PokemonGrid pokemons={filteredPokemons} onSelect={setSelectedPokemon} />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {searchTerm
                    ? `Found ${filteredPokemons.length} Pokémon matching "${searchTerm}"`
                    : `Showing all ${filteredPokemons.length} Pokémon`}
                </h2>
                <SwitchButton
                  onClick={() => setViewMode('grid')}
                  textButton="Switch to Grid View"
                />
              </div>
              <PokemonTable pokemons={filteredPokemons} onSelect={setSelectedPokemon} />
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
