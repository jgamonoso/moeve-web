import { createActionGroup, emptyProps } from '@ngrx/store';

export const ModulesActions = createActionGroup({
  source: 'Modules',
  events: {
    'Modules Moduless': emptyProps(),
  },
});
