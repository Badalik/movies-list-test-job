import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MoviesListComponent } from '@movies/components/movies-list';

import { MOVIES_LIST_TOKEN, moviesListPageProviders } from './movies-list-page.providers';

@Component({
  selector: 'app-movies-list-page',
  imports: [
    MoviesListComponent,
    AsyncPipe,
  ],
  providers: moviesListPageProviders,
  templateUrl: './movies-list-page.component.html',
  styleUrl: './movies-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListPageComponent {

  protected moviesList$ = inject(MOVIES_LIST_TOKEN);

}
