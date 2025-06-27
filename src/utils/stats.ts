import type { PokemonType } from "../types/pokemon";

export const lowAndHighStats = (quantity: number): string => {
  if (quantity < 50) {
    return "text-red-500";
  } else if (quantity > 70) {
    return "text-green-500";
  } else {
    return "text-black";
  }
};

export const getStat = (pokemon: PokemonType, statName: string): number => {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat?.base_stat ?? 0;
};
