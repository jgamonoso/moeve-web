import { createFeature, createReducer, on } from '@ngrx/store';
import { StationsActions } from '../actions/stations.actions';

export const stationsFeatureKey = 'stations';

// Antes:
// export interface State {}
// export const initialState: State = {};

// Después:
export type State = Record<string, never>;
export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(StationsActions.stationsStationss, (state) => state),
);

export const stationsFeature = createFeature({
  name: stationsFeatureKey,
  reducer,
});
