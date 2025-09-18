import { Routes } from '@angular/router';
import { firstAccessGuard } from './core/guards/first-access.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./features/loading/splash/splash.component').then(m => m.SplashComponent)
  },
  {
    path: 'hope',
    canActivate: [firstAccessGuard],
    loadComponent: () =>
      import('./features/hope-moment/hope-moment/hope-moment.component')
        .then(m => m.HopeMomentComponent)
  },
  {
    path: 'landscape',
    canActivate: [firstAccessGuard],
    loadComponent: () =>
      import('./features/landscape/landscape/landscape.component')
        .then(m => m.LandscapeComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
