import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';

import { LANG_LOCALSTORAGE_NAME } from '@core/constants/localctorage';

@Injectable({
  providedIn: 'root',
})
export class LangService {

  private readonly _primengConfig = inject(PrimeNG);

  private readonly _translateService = inject(TranslateService);

  public change(lang: string): void {
    this._translateService.use(lang);

    this._translateService.get('primeng')
      .pipe(first())
      .subscribe((res) => this._primengConfig.setTranslation(res));

    localStorage.setItem(LANG_LOCALSTORAGE_NAME, lang);
  }

}
