import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProgressContext, StationSummary } from '../../core/models/progress.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private resolveDataset(): 'user1' | 'user2' {
    const u = this.auth.getCurrentUser();
    return (u?.dataset ?? 'user1');
  }

  getProgressForCurrentUser(): Observable<ProgressContext> {
    const dataset = this.resolveDataset();
    const url = `assets/mocks/context-progress.${dataset}.json`; // 👈 cambiado

    return this.http.get<ProgressContext>(url).pipe(
      map(ctx => this.ensureExactlyFiveStations(ctx)),
      catchError(err => {
        console.error('Error leyendo mocks de progreso', err);
        return throwError(() => new Error('No se pudo cargar el progreso mock.'));
      })
    );
  }

  private ensureExactlyFiveStations(ctx: ProgressContext): ProgressContext {
    const stations: StationSummary[] = [...(ctx.stations || [])];

    while (stations.length < 5) {
      stations.push({
        id: `tbd-${stations.length + 1}`,
        title: 'Coming soon',
        percent: 0,
        completedModules: 0,
        totalModules: 0,
        durationMins: 0,
        suggestedOrder: stations.length + 1
      });
    }
    if (stations.length > 5) stations.length = 5;

    return { ...ctx, stations };
  }
}
