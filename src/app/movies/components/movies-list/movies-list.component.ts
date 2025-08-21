import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

import { MovieApiResponse } from '@core/models';
import { ApiMoviesService } from '@core/services/api-movies.service';

import { MovieComponent } from '@movies/components/movie';

import { ContainerComponent } from '@shared/components/container';

@Component({
  selector: 'app-movies-list',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule,
    MovieComponent,
    ContainerComponent,
    Button,
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
          return value !== null && value.trim().length > 2;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        map((value) => (value as string).toLowerCase()),
        switchMap((value) => this._apiMoviesService.getMovies(value as string)),
      )
      .subscribe((items) => {
        this.list.set(items);
      });
  }

  protected addMovie(): void {
    this.isAdding = true;
  }

}
