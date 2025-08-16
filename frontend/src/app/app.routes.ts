import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories-list/categories-list.component').then(m => m.CategoriesListComponent)
  },
];
