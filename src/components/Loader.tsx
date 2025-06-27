import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative w-[50px] h-[50px] rounded-full border-[4px] border-red-600 border-t-transparent animate-spin">
        <div className="absolute top-1/2 left-1/2 w-[20px] h-[20px] bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-gray-600 text-[1.1rem] m-0">Loading Pokémon...</p>
    </div>
  );
};

export default Loader;
