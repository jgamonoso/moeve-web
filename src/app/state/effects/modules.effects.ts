import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { ModulesActions } from '../actions/modules.actions';

@Injectable()
export class ModulesEffects {
  private readonly actions$ = inject(Actions);

  modulesModuless$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ModulesActions.modulesModuless),
      // An EMPTY observable only emits completion. Replace with your own API call:
      concatMap(() => EMPTY as Observable<{ type: string }>),
    ),
  );
}
