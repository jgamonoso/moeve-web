import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProgress from '../reducers/progress.reducer';

export const selectProgressState = createFeatureSelector<fromProgress.State>(
  fromProgress.progressFeatureKey
);
