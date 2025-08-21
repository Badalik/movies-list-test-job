import { inject, InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieApiResponse } from '@core/models';
import { ApiMoviesService } from '@core/services/api-movies.service';

export const MOVIES_LIST_TOKEN = new InjectionToken<Observable<MovieApiResponse[]>>(
  'A stream with movies list',
);

export const moviesListPageProviders: Provider[] = [
  {
    provide: MOVIES_LIST_TOKEN,
    useFactory: moviesListFactory,
  },
];

function moviesListFactory(): Observable<MovieApiResponse[]> {
  const apiMoviesService = inject(ApiMoviesService);

  return apiMoviesService.getMovies();
}

