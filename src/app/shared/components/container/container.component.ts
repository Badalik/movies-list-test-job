import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [],
  host: {
    '[class]': 'mode()',
  },
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {

  public readonly mode = input<'full' | 'center' | 'h100' | 'full h100'>('full');

}
