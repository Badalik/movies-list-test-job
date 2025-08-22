import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { Select } from 'primeng/select';

import { LANG_LOCALSTORAGE_NAME } from '@core/constants/localctorage';
import { Lang } from '@core/enums';
import { LangService } from '@core/services/lang.service';

@Component({
  selector: 'app-lang-switcher',
  imports: [
    Select,
    FormsModule,
  ],
  templateUrl: './lang-switcher.component.html',
  styleUrl: './lang-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSwitcherComponent implements OnInit {

  protected value: string | null = null;

  protected options = Object.values(Lang);

  private readonly _langService = inject(LangService);

  private readonly _translateService = inject(TranslateService);

  public ngOnInit(): void {
    const lang = localStorage.getItem(LANG_LOCALSTORAGE_NAME) ?? this._translateService.getCurrentLang();

    this.value = lang;

    if (lang !== this._translateService.getCurrentLang()) {
      this._langService.change(lang);
    }
  }

  public change(lang: string): void {
    this._langService.change(lang);
  }

}
