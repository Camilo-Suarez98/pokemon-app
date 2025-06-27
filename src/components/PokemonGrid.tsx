import React, { useState } from 'react';

import type { PokemonType } from '../types/pokemon';
import { toCapitalize } from '../utils/capitalize';
import SwitchButton from './ui/SwitchButton';

const PokemonGrid: React.FC<{ pokemons: PokemonType[], onSelect: (pokemon: PokemonType) => void }> = ({ pokemons, onSelect }) => {
  const [quantityOfPokemon, setQuantityOfPokemon] = useState(40);

  return (
    <div className="p-5">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4">
        {pokemons.slice(0, quantityOfPokemon).map((pokemon) => (
          <div
            key={pokemon.id}
            className="relative rounded-lg border p-6 bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onSelect(pokemon)}
          >
            <span className="text-gray-700 absolute top-4 left-4">#{pokemon.id}</span>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-24 h-24 m-auto block"
            />
            <div className="text-center">
              <h3 className="text-capitalize text-gray-900">{toCapitalize(pokemon.name)}</h3>
            </div>
          </div>
        ))}
      </div>
      {pokemons.length > 0 && (
        <SwitchButton
          textButton="Load More"
          onClick={() => setQuantityOfPokemon(quantityOfPokemon + 40)}
          disabled={quantityOfPokemon >= pokemons.length}
        />
      )}
    </div>
  );
};

export default PokemonGrid;
