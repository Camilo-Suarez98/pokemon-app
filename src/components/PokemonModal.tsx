import React from 'react';

import type { PokemonModalProps } from '../types/pokemon';

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="pokemon-modal-header">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        <div className="pokemon-modal-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </div>
        <div className="pokemon-modal-info">
          <div className="pokemon-types">
            <h3>Types:</h3>
            <div className="type-list">
              {pokemon.types.map((type) => (
                <span key={type.slot} className={`type-badge ${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="pokemon-stats">
            <h3>Stats:</h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-item">
                <span className="stat-name">{stat.stat.name}:</span>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            ))}
          </div>
          <div className="pokemon-details">
            <div className="detail-item">
              <span>Height:</span>
              <span>{pokemon.height / 10} m</span>
            </div>
            <div className="detail-item">
              <span>Weight:</span>
              <span>{pokemon.weight / 10} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
