import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'run-input',
    loadComponent: () => import('./run-input/run-input.page').then( m => m.RunInputPage)
  },
  {
    path: 'input',
    loadComponent: () => import('./input/input.page').then( m => m.InputPage)
  },
  {
    path: 'info',
    loadComponent: () => import('./info/info.page').then( m => m.InfoPage)
  },
];
