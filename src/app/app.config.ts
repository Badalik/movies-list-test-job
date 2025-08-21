import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';

import { primengPreset } from '@core/constants/primeng-presets';
import { Lang, ThemeMode } from '@core/enums';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix:'./i18n/', suffix:'.json' }),
      fallbackLang: Lang.EN,
      lang: Lang.EN,
    }),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: primengPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'optimize, primeng, app',
          },
          darkModeSelector: `.${ThemeMode.DARK}`,
        },
      },
    }),
  ],
};
