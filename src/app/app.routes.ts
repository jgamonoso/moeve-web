import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/hope-moment/hope-moment/hope-moment.component')
        .then(m => m.HopeMomentComponent)
  },
  {
    path: 'landscape',
    loadComponent: () =>
      import('./features/landscape/landscape/landscape.component')
        .then(m => m.LandscapeComponent)
  },
  { path: '**', redirectTo: '' },
];
