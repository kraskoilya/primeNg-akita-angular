export class Pokemon {
  name: string;
  capital: string;

  constructor(item: Pokemon) {
    Object.assign(this, item);
  }
}

export function createPokemon(params: Partial<Pokemon>) {
  return {} as Pokemon;
}
