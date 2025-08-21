import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { first } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';

import { THEME_LOCALSTORAGE_NAME } from '@core/constants/localctorage';
import { Lang, ThemeMode } from '@core/enums';
import { ThemeModeService } from '@core/services/theme-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  public title = 'Test job - Movies list';

  private readonly _themeModeService = inject(ThemeModeService);

  constructor(
    private readonly _primengConfig: PrimeNG,
    private readonly _translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    const projectLangs = Object.values(Lang);
    const browserLang = this._translateService.getBrowserLang();

    this._translateService.addLangs(projectLangs);
    this._translateService.setDefaultLang(Lang.EN);

    if (typeof browserLang !== 'undefined') {
      this._translateService.use(projectLangs.some((p) => p === browserLang) ? browserLang : Lang.EN);
    }

    this._keepTheme();
  }

  public changeLang(lang: Lang): void {
    this._translateService.use(lang);

    this._translateService.get('primeng')
      .pipe(first())
      .subscribe((res) => this._primengConfig.setTranslation(res));
  }

  private _keepTheme(): void {
    const themeMode = localStorage.getItem(THEME_LOCALSTORAGE_NAME);
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (themeMode !== null) {
      this._themeModeService.change(themeMode);
    }

    if (prefersDarkTheme.matches) {
      this._themeModeService.change(ThemeMode.DARK);
    }
  }

}
