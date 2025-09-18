import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ProgressActions } from '../actions/progress.actions';

@Injectable()
export class ProgressEffects {


  progressProgresss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProgressActions.progressProgresss),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
