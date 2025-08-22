import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { HeadingComponent } from '@shared/components/heading';

@Component({
  selector: 'app-card-header',
  imports: [
    HeadingComponent,
  ],
  templateUrl: './card-header.component.html',
  styleUrl: './card-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {

  public title = input<string>('');

  public isEditing = input<boolean>(false);

}
