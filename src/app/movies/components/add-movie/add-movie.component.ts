import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';

import { MovieApiCreateRequest } from '@core/models';

import { CardComponent } from '@shared/components/card';

interface CreateMovieForm {
  name: FormControl<string | null>;
  isOnline: FormControl<boolean>;
}

@Component({
  selector: 'app-add-movie',
  imports: [
    ReactiveFormsModule,
    Button,
    CardComponent,
    Checkbox,
    InputText,
    TranslatePipe,
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {

  public valueChanged = output<MovieApiCreateRequest>();

  protected formGroup = new FormGroup<CreateMovieForm>({
    name: new FormControl(null, { validators: [Validators.required] }),
    isOnline: new FormControl(false, { nonNullable: true }),
  });

  protected saveMovie(): void {
    if (this.formGroup.valid) {
      this.valueChanged.emit(this.formGroup.value as MovieApiCreateRequest);
    }
  }

}
