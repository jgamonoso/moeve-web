// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { provideStoreDevtools } from '@ngrx/store-devtools';

// 👇 importa lo que te haya generado el schematic
import * as fromApp      from './state/reducers/app.reducer';
import * as fromProgress from './state/reducers/progress.reducer';
import * as fromStations from './state/reducers/stations.reducer';
import * as fromModules  from './state/reducers/modules.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideEffects([]), // sin efectos por ahora
    provideStoreDevtools(), // solo en local está bien
    provideState({ name: fromApp.appFeatureKey, reducer: fromApp.reducer }),
    provideState({ name: fromProgress.progressFeatureKey, reducer: fromProgress.reducer }),
    provideState({ name: fromStations.stationsFeatureKey, reducer: fromStations.reducer }),
    provideState({ name: fromModules.modulesFeatureKey, reducer: fromModules.reducer }),
  ]
};
