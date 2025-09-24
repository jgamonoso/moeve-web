import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalFlagsService {
  get language(): string | undefined {
    return localStorage.getItem('lang') ?? undefined;
  }
  set language(v: string | undefined) {
    if (v) {
      localStorage.setItem('lang', v);
    } else {
      localStorage.removeItem('lang');
    }
  }

  get onboardingDone(): boolean {
    return localStorage.getItem('onboarding') === '1';
  }
  set onboardingDone(v: boolean) {
    if (v) {
      localStorage.setItem('onboarding', '1');
    } else {
      localStorage.removeItem('onboarding');
    }
  }
}
