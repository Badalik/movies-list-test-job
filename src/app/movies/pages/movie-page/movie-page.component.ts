import { Component, inject } from '@angular/core';

import { MOVIE_TOKEN, moviePageProviders } from './movie-page.providers';

@Component({
  selector: 'app-movie-page',
  imports: [],
  providers: moviePageProviders,
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {

  protected movie$ = inject(MOVIE_TOKEN);

}
