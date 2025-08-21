import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { THEME_LOCALSTORAGE_NAME } from '@core/constants/localctorage';
import { ThemeMode, ThemeModeIcon } from '@core/enums';

@Injectable({
  providedIn: 'root',
})
export class ThemeModeService {

  private readonly _icon$ = new BehaviorSubject<ThemeModeIcon>(ThemeModeIcon.LIGHT);

  public get icon$(): Observable<ThemeModeIcon> {
    return this._icon$.asObservable();
  }

  public change(themeMode: string): void {
    const element = document.querySelector('html');

    if (element !== null) {
      element.classList.add(themeMode);

      if (themeMode === ThemeMode.LIGHT) {
        element.classList.remove(ThemeMode.DARK);

        this._icon$.next(ThemeModeIcon.LIGHT);
      } else {
        element.classList.remove(ThemeMode.LIGHT);

        this._icon$.next(ThemeModeIcon.DARK);
      }
    }
  }

  public toggle(): void {
    const element = document.querySelector('html');

    if (element !== null) {
      element.classList.toggle(ThemeMode.DARK);

      if (element.classList.contains(ThemeMode.DARK)) {
        this._icon$.next(ThemeModeIcon.DARK);

        localStorage.setItem(THEME_LOCALSTORAGE_NAME, ThemeMode.DARK);
      } else {
        this._icon$.next(ThemeModeIcon.LIGHT);

        localStorage.setItem(THEME_LOCALSTORAGE_NAME, ThemeMode.LIGHT);
      }
    }
  }

}
