import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { PaginationResponse } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pokemon } from './pokemon.model';
import { PokemonStore } from './pokemon.store';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private BASE_URL = 'http://localhost:8000';

  constructor(private pokemonStore: PokemonStore, private http: HttpClient) {}

  get(params?: Params): Observable<PaginationResponse<Pokemon>> {
    return this.http
      .get<PaginationResponse<Pokemon>>(this.BASE_URL + `/page${params.page}`, {
        params,
      })
      .pipe(tap((res) => this.pokemonStore.set(res.data)));
  }
}
