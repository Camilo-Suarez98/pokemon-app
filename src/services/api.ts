import type { PokemonType, PokemonListItem } from "../types/pokemon";

const fetchAllPokemon = async (idOrName: string = ""): Promise<PokemonType[]> => {
  try {
    if (idOrName) {
      // Handle search by ID or name
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      return [data]; // Return as array to maintain consistent return type
    }
    
    // Handle initial load with all Pokémon
    const listRes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const listData = await listRes.json();
    const results: PokemonListItem[] = listData.results;

    const detailed = await Promise.all(
      results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error(`Error with pokemon: ${pokemon.name}`);
        return res.json();
      })
    );

    return detailed;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch Pokémon');
  }
};

export default fetchAllPokemon;
