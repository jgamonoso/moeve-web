import { createFeature, createReducer, on } from '@ngrx/store';
import { ProgressActions } from '../actions/progress.actions';

export const progressFeatureKey = 'progress';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ProgressActions.progressProgresss, state => state),

);

export const progressFeature = createFeature({
  name: progressFeatureKey,
  reducer,
});

