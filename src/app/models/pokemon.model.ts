export interface PokemonListItem {
  name: string;
  image: string;
}

export interface PokemonDetail {
  name: string;
  sprites: { front_default: string };
  // otros campos...
}
