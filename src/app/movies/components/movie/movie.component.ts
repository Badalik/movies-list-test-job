import { ChangeDetectionStrategy, Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';

import { MovieApiResponse, MovieUpdateApiRequest } from '@core/models';
import { ApiMoviesService } from '@core/services/api-movies.service';

import { CardComponent } from '@shared/components/card';
import { CardHeaderComponent } from '@shared/components/card-header';

@Component({
  selector: 'app-movie',
  imports: [
    CardComponent,
    Button,
    ReactiveFormsModule,
    InputText,
    Checkbox,
    TranslatePipe,
    CardHeaderComponent,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {

  public movie = model.required<MovieApiResponse>();

  protected isEditing = false;

  protected formGroup!: FormGroup<{ [p: string]: FormControl<string | null | boolean> }>;

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiMoviesService = inject(ApiMoviesService);

  public ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};

    for (const [key, value] of Object.entries(this.movie())) {
      formGroup[key] = new FormControl<string | number | boolean | null>(value);
    }

    this.formGroup = new FormGroup(formGroup);

    this.formGroup.get('name')?.addValidators([Validators.required]);
    this.formGroup.updateValueAndValidity();
  }

  protected deleteMovie(id: number): void {
    this._apiMoviesService.deleteMovie(id);
  }

  protected saveMovie(): void {
    this.isEditing = false;

    if (this.formGroup.valid) {
      this._apiMoviesService.updateMovie(this.formGroup.value as unknown as MovieUpdateApiRequest);
    }
  }

  protected toggleEditing(): void {
    this.isEditing = true;
  }

}
