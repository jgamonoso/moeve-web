import { createActionGroup, emptyProps } from '@ngrx/store';

export const ProgressActions = createActionGroup({
  source: 'Progress',
  events: {
    'Progress Progresss': emptyProps(),
  },
});
