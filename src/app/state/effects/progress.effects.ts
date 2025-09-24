import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ProgressActions } from '../actions/progress.actions';

@Injectable()
export class ProgressEffects {
  private readonly actions$ = inject(Actions);

  progressProgresss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgressActions.progressProgresss),
      // An EMPTY observable only emits completion. Replace with your own API call:
      concatMap(() => EMPTY as Observable<{ type: string }>),
    ),
  );
}
