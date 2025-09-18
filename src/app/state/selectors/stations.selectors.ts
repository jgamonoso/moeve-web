import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStations from '../reducers/stations.reducer';

export const selectStationsState = createFeatureSelector<fromStations.State>(
  fromStations.stationsFeatureKey
);
