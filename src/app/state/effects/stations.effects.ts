import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { StationsActions } from '../actions/stations.actions';

@Injectable()
export class StationsEffects {
  private readonly actions$ = inject(Actions);

  stationsStationss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.stationsStationss),
      // An EMPTY observable only emits completion. Replace with your own API call:
      concatMap(() => EMPTY as Observable<{ type: string }>),
    ),
  );
}
