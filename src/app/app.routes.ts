import { Routes } from '@angular/router';

import { MoviePageComponent } from '@movies/pages/movie-page';
import { MoviesListPageComponent } from '@movies/pages/movies-list-page';

import { LayoutComponent } from './layout/components/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'movies',
        component: MoviesListPageComponent,
      },
      {
        path: 'movies/:id',
        component: MoviePageComponent,
      },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full'  },
];
