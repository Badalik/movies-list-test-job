import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { LANG_LOCALSTORAGE_NAME, THEME_LOCALSTORAGE_NAME } from '@core/constants/localctorage';
import { Lang, ThemeMode } from '@core/enums';
import { ThemeModeService } from '@core/services/theme-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  public title = 'Test job - Movies list';

  private readonly _themeModeService = inject(ThemeModeService);

  private readonly _translateService = inject(TranslateService);

  public ngOnInit(): void {
    const projectLangs = Object.values(Lang);
    const browserLang = this._translateService.getBrowserLang();
    const localStorageLang = localStorage.getItem(LANG_LOCALSTORAGE_NAME);
    const lang = localStorageLang ?? browserLang;

    this._translateService.addLangs(projectLangs);
    this._translateService.setDefaultLang(Lang.EN);

    if (typeof lang !== 'undefined') {
      this._translateService.use(projectLangs.some((p) => p === lang) ? lang : Lang.EN);
    }

    this._keepTheme();
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
