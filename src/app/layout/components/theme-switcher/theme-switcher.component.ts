import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Button } from 'primeng/button';

import { ThemeModeService } from '@core/services/theme-mode.service';

@Component({
  selector: 'app-theme-switcher',
  imports: [
    AsyncPipe,
    Button,
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {

  protected themeModeService = inject(ThemeModeService);

  protected icon$ = this.themeModeService.icon$;

  protected toggle(): void {
    this.themeModeService.toggle();
  }

}
