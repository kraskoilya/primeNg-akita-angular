import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ListComponent } from './pages/list/list.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    PokemonsRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PokemonsModule {}
