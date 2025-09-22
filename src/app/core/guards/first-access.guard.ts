import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const firstAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const user = auth.getCurrentUser();
  if (user) return true;
  router.navigateByUrl('/login');
  return false;
};