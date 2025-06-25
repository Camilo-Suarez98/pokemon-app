import React, { useState } from 'react';

import type { PokemonType, PokemonGridProps } from '../types/pokemon';
import PokemonModal from './PokemonModal.tsx';

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType | null>(null);

  const openModal = (pokemon: PokemonType) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="relative bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-500 hover:scale-105"
            onClick={() => openModal(pokemon)}
          >
            <span className="text-gray-700 absolute top-4 left-4">#{pokemon.id}</span>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-24 h-24 m-auto block"
            />
            <div className="text-center">
              <h3 className="text-capitalize text-gray-900">{pokemon.name}</h3>
            </div>
          </div>
        ))}
      </div>
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
