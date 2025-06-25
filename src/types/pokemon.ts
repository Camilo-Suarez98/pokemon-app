export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: PokemonTypes[];
  stats: Stat[];
}

export interface PokemonListResponseType {
  results: Array<PokemonType>;
}

export interface PokemonGridProps {
  pokemons: PokemonType[];
}

export interface PokemonModalProps {
  pokemon: PokemonType;
  onClose: () => void;
}