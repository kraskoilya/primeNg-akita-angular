import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Pokemon } from './pokemon.model';
import { PokemonState, PokemonStore } from './pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonQuery extends QueryEntity<PokemonState, Pokemon> {
  constructor(protected store: PokemonStore) {
    super(store);
  }
}
