import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'entry-level', pathMatch: 'full' },
  {
    path: 'entry-level',
    loadComponent: () => import('@features').then((c) => c.EntryLevelComponent),
  },
  {
    path: 'intermediate-level',
    loadComponent: () =>
      import('@features').then((c) => c.IntermediateLevelComponent),
  },
];
