import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { PokemonQuery } from './pokemon.query';

export const POKEMON_PAGINATOR = new InjectionToken('POKEMON_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const pokemonQuery = inject(PokemonQuery);
    return new PaginatorPlugin(pokemonQuery).withControls().withRange();
  },
});
