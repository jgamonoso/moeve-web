export type UserProfile = 'newHire' | 'internalMobility';

export interface Recommendation {
  nextStationId?: string;         // para el pointer
  reason?: string;                // texto que explique por qué
}

export interface Badge {
  type: 'priority' | 'optional';
  label: string;                  // "Prioritario", etc.
}

export interface StationSummary {
  id: string; title: string;
  percent: number; completedModules: number; totalModules: number;
  durationMins: number; suggestedOrder: number;
  badges?: Badge[];               // p.ej. "Prioritario"
}
