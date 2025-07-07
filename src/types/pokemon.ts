export interface PokemonListItem {
  name: string;
  url: string;
}

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
    other: {
      official_artwork: {
        front_default: string;
      };
    };
  };
  types: PokemonTypes[];
  base_experience: number;
  stats: Stat[];
}

export interface PokemonListResponseType {
  results: Array<PokemonType>;
}

export interface PokemonProps {
  pokemons: PokemonType[];
  onSelect: (pokemon: PokemonType) => void;
}

export interface PokemonModalProps {
  pokemon: PokemonType;
  onClose: () => void;
}