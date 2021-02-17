import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { POKEMON_PAGINATOR } from '../../state/state/paginator';
import { Pokemon } from '../../state/state/pokemon.model';
import { PokemonQuery } from './../../state/state/pokemon.query';
import { PokemonService } from './../../state/state/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('td') myTable: any;

  items$: Observable<PaginationResponse<any>>;
  sortByControl: FormControl = this.fb.control(
    this.route.snapshot.queryParamMap.get('search') || ''
  );

  constructor(
    @Inject(POKEMON_PAGINATOR)
    public paginatorRef: PaginatorPlugin<Pokemon>,
    private pokemonQuery: PokemonQuery,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(map((params) => +params.get('page') || 1))
      .subscribe((page) => this.paginatorRef.setPage(page));

    const sortChanges$ = this.sortByControl.valueChanges.pipe(
      startWith(''),
      tap((el) => {
        this.paginatorRef.clearCache({
          clearStore: false,
        });
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: el,
          },
          queryParamsHandling: 'merge',
        });
      })
    );
    this.items$ = combineLatest([
      sortChanges$.pipe(),
      this.paginatorRef.pageChanges,
    ]).pipe(
      distinctUntilChanged(),
      switchMap(([search, page]) => {
        const requestFn = () => this.pokemonService.get({ page, search });

        return this.paginatorRef.getPage(requestFn).pipe();
      })
    );
  }

  ngOnDestroy() {
    this.paginatorRef.destroy();
  }

  onLazyLoad(event: LazyLoadEvent): void {
    const page = event.first / event.rows + 1 || 1;
    if (page !== this.paginatorRef.currentPage) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page,
        },
        queryParamsHandling: 'merge',
      });
    }
  }
}
