import React from 'react';
import { Heart, Shield, Sword, Zap } from 'lucide-react';
import { lowAndHighStats } from '../utils/stats';

import type { PokemonModalProps } from '../types/pokemon';

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  const getStatIcon = (statName: string): React.ReactElement | null => {
    switch (statName) {
      case "hp":
        return <Heart className="w-4 h-4 inline mr-1" />;
      case "attack":
        return <Sword className="w-4 h-4 inline mr-1" />;
      case "defense":
        return <Shield className="w-4 h-4 inline mr-1" />;
      case "special-attack":
        return <Sword className="w-4 h-4 inline mr-1" />;
      case "special-defense":
        return <Shield className="w-4 h-4 inline mr-1" />;
      case "speed":
        return <Zap className="w-4 h-4 inline mr-1" />;
      default:
        return null;
    }
  };
  return (
    <div className="fixed inset-0 w-full h-full flex justify-center items-center z-50 bg-black/80" onClick={onClose}>
      <div className="bg-white relative rounded-lg p-6 max-w-3xl w-11/12 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 bg-transparent border-none text-2xl px-2 py-1 cursor-pointer text-gray-500 outline-none hover:text-gray-700" onClick={onClose}>&times;</button>
        <div className="flex items-center mb-4 gap-4">
          <h2 className="font-semibold text-2xl capitalize flex items-center gap-2">
            {pokemon.name}
            <span className="text-lg text-[#64748b]">#{pokemon.id.toString().padStart(3, '0')}</span>
          </h2>
        </div>

        <div className='grid items-center md:grid-cols-2 gap-6'>
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {pokemon.types.map((type) => (
                  <span key={type.slot} className={`${type.type.name} type-badge py-2 px-4 rounded-full capitalize text-white font-bold`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className='font-semibold'>Height:</p>
                  <p>{pokemon.height / 10} m</p>
                </div>
                <div>
                  <p className='font-semibold'>Weight:</p>
                  <p>{pokemon.weight / 10} kg</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold tracking-tight text-2xl capitalize flex items-center gap-2">Base Stats:</h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex justify-between my-2">
                <span className="capitalize font-medium">
                  {getStatIcon(stat.stat.name)}
                  {stat.stat.name}:
                </span>
                <span
                  className={`font-semibold ${lowAndHighStats(stat.base_stat)}`}
                >
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
