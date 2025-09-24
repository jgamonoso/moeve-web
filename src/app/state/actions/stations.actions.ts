import { createActionGroup, emptyProps } from '@ngrx/store';

export const StationsActions = createActionGroup({
  source: 'Stations',
  events: {
    'Stations Stationss': emptyProps(),
  },
});
