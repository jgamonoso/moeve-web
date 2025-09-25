import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StationData } from '../models/station.models';

@Injectable({ providedIn: 'root' })
export class StationService {
  private http = inject(HttpClient);

  loadStation(id: string): Observable<StationData> {
    return this.http.get<StationData>(`assets/mocks/stations/${id}.json`);
  }
}
