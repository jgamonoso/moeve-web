import { UserProfile, Recommendation, StationSummary } from './app.model';

export interface Molecules { value: number; total: number; }
export interface ProgressContext {
  molecules: Molecules;
  percent: number;
  remainingMinutes: number;
  profile: UserProfile;
  recommendation?: Recommendation;
  stations: StationSummary[];
}
