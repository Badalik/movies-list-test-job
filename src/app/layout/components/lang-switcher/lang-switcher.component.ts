import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { Select } from 'primeng/select';

import { LANG_LOCALSTORAGE_NAME } from '@core/constants/localctorage';
import { Lang } from '@core/enums';

@Component({
  selector: 'app-lang-switcher',
  imports: [
    Select,
    FormsModule,
  ],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.scss',
})
export class LangSwitcherComponent implements OnInit {

  protected value: string | null = null;

  protected options = Object.values(Lang);

  private readonly _primengConfig = inject(PrimeNG);

  private readonly _translateService = inject(TranslateService);

  public ngOnInit(): void {
    const lang = localStorage.getItem(LANG_LOCALSTORAGE_NAME) ?? this._translateService.getCurrentLang();

    this.value = lang;

    if (lang !== this._translateService.getCurrentLang()) {
      this.change(lang);
    }
  }

  public change(lang: string): void {
    this._translateService.use(lang);

    this._translateService.get('primeng')
      .pipe(first())
      .subscribe((res) => this._primengConfig.setTranslation(res));

    localStorage.setItem(LANG_LOCALSTORAGE_NAME, lang);
  }

}
