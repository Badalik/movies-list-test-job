import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, of, tap } from 'rxjs';

import { MovieApiCreateRequest, MovieApiResponse, MovieUpdateApiRequest } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class ApiMoviesService {

  private readonly _http = inject(HttpClient);

  private readonly _baseUrl = '/api';

  private readonly _moviesList$ = new BehaviorSubject<MovieApiResponse[]>([]);

  public get moviesList$(): Observable<MovieApiResponse[]> {
    return this._moviesList$.asObservable();
  }

  constructor() {
    this._getMoviesFromApi().subscribe();
  }

  public getMovies(searchStr?: string | null): Observable<MovieApiResponse[]> {
    const movies = this._moviesList$.getValue();

    if (searchStr) {
      return of(movies.filter((p) => p.name.toLowerCase().includes(searchStr.toLowerCase())));
    }

    return this.moviesList$;
  }

  public getMovieById(id: number | null): Observable<MovieApiResponse | null> {
    if (id === null) {
      return of(null);
    }

    const movies = this._moviesList$.getValue();
    const foundMovie = movies.find((p) => p.id === id);

    if (typeof foundMovie !== 'undefined') {
      return of(foundMovie);
    }

    return of(null);
  }

  public addMovie(createdMovie: MovieApiCreateRequest): number {
    const movies = this._moviesList$.getValue();

    const newMovie = {
      id: movies.length + 1,
      name: createdMovie.name,
      isOnline: createdMovie.isOnline,
    };

    this._moviesList$.next([...movies, newMovie]);

    return newMovie.id;
  }

  public updateMovie(updatedMovie: MovieUpdateApiRequest): Observable<MovieApiResponse | null> {
    const id = updatedMovie.id;

    if (typeof id === 'undefined') {
      return of(null);
    }

    const movies = this._moviesList$.getValue();
    const foundMovie = movies.find((p) => p.id === id);

    if (typeof foundMovie !== 'undefined') {
      for (const [key, value] of Object.entries(updatedMovie)) {
        if (key === 'name' && typeof value === 'string') {
          foundMovie[key] = value;
        }

        if (key === 'isOnline' && typeof value === 'boolean') {
          foundMovie[key] = value;
        }
      }

      this._moviesList$.next(movies);

      return of(foundMovie);
    }

    return of(null);
  }

  public deleteMovie(id: number): void {
    const movies = this._moviesList$.getValue();
    const foundMovieIndex = movies.findIndex((p) => p.id === id);

    if (foundMovieIndex >= 0) {
      movies.splice(foundMovieIndex, 1);
    }
  }

  private _getMoviesFromApi(): Observable<MovieApiResponse[]> {
    return this._http.get<MovieApiResponse[]>(`${this._baseUrl}/movies/list.json`)
      .pipe(
        first(),
        tap((movies) => {
          this._moviesList$.next(movies);
        }),
      );
  }

}
