import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import * as fromApp      from './state/reducers/app.reducer';
import * as fromProgress from './state/reducers/progress.reducer';
import * as fromStations from './state/reducers/stations.reducer';
import * as fromModules  from './state/reducers/modules.reducer';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  TranslateHttpLoader,
  provideTranslateHttpLoader,
} from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),

    provideStore(),
    provideEffects([]),
    provideStoreDevtools(),
    provideState({ name: fromApp.appFeatureKey, reducer: fromApp.reducer }),
    provideState({ name: fromProgress.progressFeatureKey, reducer: fromProgress.reducer }),
    provideState({ name: fromStations.stationsFeatureKey, reducer: fromStations.reducer }),
    provideState({ name: fromModules.modulesFeatureKey, reducer: fromModules.reducer }),

    // 1) NUEVO en v17: provee la config del HttpLoader mediante este helper
    provideTranslateHttpLoader({
      prefix: 'assets/i18n/',
      suffix: '.json',
      // useHttpBackend / enforceLoading -> opcional
    }),

    // Añade explícitamente el provider de TranslateHttpLoader (evita "No provider for _TranslateHttpLoader")
    TranslateHttpLoader,

    // 2) Configura TranslateModule apuntando al loader existente
    importProvidersFrom(
      TranslateModule.forRoot({
        // defaultLanguage / useDefaultLang están deprecados en v17
        fallbackLang: 'es',
        loader: {
          provide: TranslateLoader,
          useExisting: TranslateHttpLoader,
        },
      })
    ),
  ]
};
