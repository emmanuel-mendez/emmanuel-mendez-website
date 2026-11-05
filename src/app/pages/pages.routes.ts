import { Routes } from '@angular/router';
import { Home } from './home/home';

const SUFFIX = ' - Emmanuel Mendez';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects').then((module) => module.Projects),
    title: `Projects${SUFFIX}`,
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./projects/project-detail/project-detail').then((module) => module.ProjectDetail),
    title: `Project${SUFFIX}`,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found').then((module) => module.PageNotFound),
    title: `404 Not Found${SUFFIX}`,
  },
];
