import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalFlagsService } from '../services/flags/local-flags.service';

export const firstAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const flags = inject(LocalFlagsService);

  // Si no hay userId, manda a login
  if (!flags.userId) {
    return router.createUrlTree(['/login']);
  }
  return true;
};