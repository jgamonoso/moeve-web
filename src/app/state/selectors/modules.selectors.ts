import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromModules from '../reducers/modules.reducer';

export const selectModulesState = createFeatureSelector<fromModules.State>(
  fromModules.modulesFeatureKey
);
