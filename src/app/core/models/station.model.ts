import { Badge } from './app.model';

export type ModuleType = 'scroll'|'reveal'|'quiz'|'tf';
export type ModuleStatus = 'new'|'inProgress'|'done';

export interface ModuleDef {
  id: string; type: ModuleType; status: ModuleStatus;
  durationMins: number; order: number; version: string;
}

export interface StationDetail {
  id: string; title: string;
  modules: ModuleDef[];
  badges?: Badge[];
}
