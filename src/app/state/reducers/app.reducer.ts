import { createFeature, createReducer, on } from '@ngrx/store';
import { AppActions } from '../actions/app.actions';

export const appFeatureKey = 'app';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(AppActions.appApps, state => state),

);

export const appFeature = createFeature({
  name: appFeatureKey,
  reducer,
});

