import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProgressActions = createActionGroup({
  source: 'Progress',
  events: {
    'Progress Progresss': emptyProps(),
    
    
  }
});
