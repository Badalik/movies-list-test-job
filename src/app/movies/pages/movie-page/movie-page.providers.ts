import { inject, InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieApiResponse } from '@core/models';
import { ApiMoviesService } from '@core/services/api-movies.service';

export const MOVIE_TOKEN = new InjectionToken<Observable<MovieApiResponse | null>>(
  'A stream with movie',
);

export const moviePageProviders: Provider[] = [
  {
    provide: MOVIE_TOKEN,
    useFactory: movieFactory,
  },
];

function movieFactory(): Observable<MovieApiResponse | null> {
  const route = inject(ActivatedRoute);
  const apiMoviesService = inject(ApiMoviesService);
  const id = route.snapshot.paramMap.get('id');

  return apiMoviesService.getMovieById(Number(id));
}
