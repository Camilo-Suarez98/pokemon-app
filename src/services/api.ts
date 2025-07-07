import type { PokemonType, PokemonListItem } from "../types/pokemon";

const fetchAllPokemon = async (idOrName: string = ""): Promise<PokemonType[]> => {
  const checkParamsUrl = idOrName === "" ?
    "https://pokeapi.co/api/v2/pokemon?limit=151" :
    `https://pokeapi.co/api/v2/pokemon/${idOrName}`;

  try {
    const res = await fetch(checkParamsUrl);
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
