export interface MoleculesCounter {
  value: number;
  total: number; // debe ser 5
}

export interface StationSummary {
  id: string;
  title: string;
  percent: number;
  completedModules: number;
  totalModules: number;
  durationMins: number;
  suggestedOrder: number;
}

export interface ProgressContext {
  molecules: MoleculesCounter;
  percent: number;           // progreso global 0..100
  remainingMinutes: number;  // minutos estimados
  stations: StationSummary[]; // siempre 5 (lo aseguramos en servicio)
}
