import { Injectable, inject } from '@angular/core';

const KEY_LANG = 'lang';
const ONBOARDING_KEY = 'onboardingDone';

@Injectable({ providedIn: 'root' })
export class PrefsService {
  get lang(): 'es'|'en' {
    return (localStorage.getItem(KEY_LANG) as 'es'|'en') || 'es'; // por defecto ES
  }
  set lang(v: 'es'|'en') {
    localStorage.setItem(KEY_LANG, v);
  }

  get onboardingDone(): boolean {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  }
  set onboardingDone(v: boolean) {
    localStorage.setItem(ONBOARDING_KEY, String(v));
  }

  clearAll() {
    localStorage.removeItem(KEY_LANG);
    localStorage.removeItem(ONBOARDING_KEY);
  }
}
