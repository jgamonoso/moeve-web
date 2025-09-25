export type ModuleKind = 'scroll' | 'reveal' | 'quiz' | 'tf';

export interface StationData {
  id: string;
  titleKey: string;           // <— antes title (literal). Ahora clave i18n
  modules: StationModule[];
}

export interface StationModuleBase {
  id: string;
  kind: ModuleKind;
  titleKey: string;           // <— clave i18n
}

/** SCROLL */
export interface StationModuleScroll extends StationModuleBase {
  kind: 'scroll';
  items: { titleKey: string; bodyKey: string }[];   // <— claves i18n
}

/** REVEAL (flip-cards) */
export interface StationModuleReveal extends StationModuleBase {
  kind: 'reveal';
  cards: { frontKey: string; backKey: string }[];   // <— claves i18n
}

/** QUIZ */
export interface StationModuleQuiz extends StationModuleBase {
  kind: 'quiz';
  questions: { qKey: string; optionsKeys: string[]; answer: number }[];
}

/** TRUE/FALSE */
export interface StationModuleTrueFalse extends StationModuleBase {
  kind: 'tf';
  statements: { textKey: string; answer: boolean }[];
}

export type StationModule =
  | StationModuleScroll
  | StationModuleReveal
  | StationModuleQuiz
  | StationModuleTrueFalse;
