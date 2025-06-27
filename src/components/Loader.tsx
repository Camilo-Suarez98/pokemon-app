import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="pokeball-loader">
        <div className="pokeball-center"></div>
      </div>
      <p>Loading Pokémon...</p>
    </div>
  );
};

export default Loader;
