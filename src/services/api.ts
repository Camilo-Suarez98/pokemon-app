import type { PokemonType } from "../types/pokemon";

interface PokemonListItem {
  name: string;
  url: string;
}

const fetchAllPokemon = async (): Promise<PokemonType[]> => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!res.ok) throw new Error("Error fetching pokemon list");

    const data = await res.json();
    const results: PokemonListItem[] = data.results;

    const detailed = await Promise.all(
      results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error(`Error with pokemon: ${pokemon.name}`);
        return res.json();
      })
    );

    return detailed;
  } catch (error) {
    throw new Error(`Error fetching pokemon list: ${error}`);
  }
};

export default fetchAllPokemon;
