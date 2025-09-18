import { createFeature, createReducer, on } from '@ngrx/store';
import { StationsActions } from '../actions/stations.actions';

export const stationsFeatureKey = 'stations';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StationsActions.stationsStationss, state => state),

);

export const stationsFeature = createFeature({
  name: stationsFeatureKey,
  reducer,
});

