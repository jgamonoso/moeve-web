import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { AppActions } from '../actions/app.actions';

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);

  appApps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.appApps),
      // An EMPTY observable only emits completion. Replace with your own API call:
      concatMap(() => EMPTY as Observable<{ type: string }>),
    ),
  );
}
