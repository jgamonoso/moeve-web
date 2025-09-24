import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from '../actions/app.actions';

export const appFeatureKey = 'app';

// Antes:
// export interface State {}
// export const initialState: State = {};

// Después:
export type State = Record<string, never>;
export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(AppActions.appApps, (state) => state),
);

export const appFeature = createFeature({
  name: appFeatureKey,
  reducer,
});
