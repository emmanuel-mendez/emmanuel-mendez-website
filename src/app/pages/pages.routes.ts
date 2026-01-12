import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Projects } from './projects/projects';
import { PageNotFound } from './page-not-found/page-not-found';

const SUFFIX = ' - Emmanuel Mendez';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'projects',
    component: Projects,
    title: `Projects${SUFFIX}`,
  },
  {
    path: '**',
    component: PageNotFound,
    title: `404 Not Found${SUFFIX}`,
  },
];
