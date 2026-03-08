import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IconRegistryService } from './shared/icons/icon.registry';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'pt-BR'
      })
    ),
    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    }),
     {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistry: IconRegistryService) => () => {},
      deps: [IconRegistryService],
      multi: true
    }
  ]
};
