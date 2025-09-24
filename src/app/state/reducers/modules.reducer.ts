import { createFeature, createReducer, on } from '@ngrx/store';
import { ModulesActions } from '../actions/modules.actions';

export const modulesFeatureKey = 'modules';

// Antes:
// export interface State {}
// export const initialState: State = {};

// Después:
export type State = Record<string, never>;
export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(ModulesActions.modulesModuless, (state) => state),
);

export const modulesFeature = createFeature({
  name: modulesFeatureKey,
  reducer,
});
