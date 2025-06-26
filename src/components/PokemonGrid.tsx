import React, { useState } from 'react';

import type { PokemonType, PokemonGridProps } from '../types/pokemon';
import PokemonModal from './PokemonModal.tsx';

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);
  const [quantityOfPokemon, setQuantityOfPokemon] = useState(40);

  const openModal = (pokemon: PokemonType) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {pokemons.slice(0, quantityOfPokemon).map((pokemon) => (
          <div
            key={pokemon.id}
            className="relative rounded-lg border p-6 bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => openModal(pokemon)}
          >
            <span className="text-gray-700 absolute top-4 left-4">#{pokemon.id}</span>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-24 h-24 m-auto block"
            />
            <div className="text-center">
              <h3 className="text-capitalize text-gray-900">{pokemon.name}</h3>
            </div>
          </div>
        ))}
      </div>
      {pokemons.length > 0 && (
        <button
          className="px-4 py-2 mt-4 rounded-md bg-blue-500 text-white disabled:opacity-50"
          onClick={() => setQuantityOfPokemon(quantityOfPokemon + 40)}
          disabled={quantityOfPokemon >= pokemons.length}
        >
          Load More
        </button>
      )}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PokemonGrid;
