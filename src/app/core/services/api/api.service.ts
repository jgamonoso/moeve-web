import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressContext } from '../../models/progress.model';
import { StationDetail } from '../../models/station.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = '/api';

  getProgress() {
    return this.http.get<ProgressContext>(`${this.base}/context/progress`);
  }

  getStation(id: string) {
    return this.http.get<StationDetail>(`${this.base}/stations/${id}`);
  }

  postModuleProgress(moduleId: string, stationId: string) {
    return this.http.post(`${this.base}/progress/module`, { moduleId, stationId });
  }
}
