import { CanActivateFn } from '@angular/router';

export const firstAccessGuard: CanActivateFn = (route, state) => {
  return true;
};
