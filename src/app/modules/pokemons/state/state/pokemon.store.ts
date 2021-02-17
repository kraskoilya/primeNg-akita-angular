import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  PaginationResponse,
  StoreConfig,
} from '@datorama/akita';
import { Pokemon } from './pokemon.model';

export interface PokemonState
  extends EntityState<Pokemon>,
    Partial<PaginationResponse<Pokemon>> {}

const initialState: PokemonState = {};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pokemon' })
export class PokemonStore extends EntityStore<PokemonState, Pokemon> {
  constructor() {
    super(initialState);
  }
}
