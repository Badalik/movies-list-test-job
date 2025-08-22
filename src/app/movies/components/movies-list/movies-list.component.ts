import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

import { MovieApiCreateRequest, MovieApiResponse } from '@core/models';
import { ApiMoviesService } from '@core/services/api-movies.service';

import { AddMovieComponent } from '@movies/components/add-movie';
import { MovieComponent } from '@movies/components/movie';

import { ContainerComponent } from '@shared/components/container';
import { HeadingComponent } from '@shared/components/heading';

@Component({
  selector: 'app-movies-list',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule,
    MovieComponent,
    ContainerComponent,
    Button,
    AddMovieComponent,
    HeadingComponent,
    TranslatePipe,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent implements OnInit {

  public list = model<MovieApiResponse[] | null>([]);

  protected isAdding = false;

  protected searchControl = new FormControl<string | null>(null);

  private readonly _apiMoviesService = inject(ApiMoviesService);

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((value) => {
          return value === null || !value.trim().length || value.trim().length > 2;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => value === null ? value : value.toLowerCase()),
        switchMap((value) => this._apiMoviesService.getMovies(value)),
      )
      .subscribe((items) => {
        this.list.set(items);
      });
  }

  protected toggleAdding(): void {
    this.isAdding = true;
  }

  protected addMovie(movie: MovieApiCreateRequest): void {
    this._apiMoviesService.addMovie(movie);

    this.isAdding = false;
  }

}
