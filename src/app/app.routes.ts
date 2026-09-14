import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'matematica',
    children: [
      {
        path: 'analisi-1',
        loadChildren: () =>
          import('./pages/matematica/analisi-1/analisi-1.routes')
            .then(m => m.ANALISI_1_ROUTES)
      }
    ]
  },
  {
    path: 'fisica',
    children: [
      {
        path: 'teoria-misura-errori',
        loadChildren: () =>
          import('./pages/fisica/teoria-misura-errori/teoria-misura-errori.routes')
            .then(m => m.TEORIA_MISURA_ERRORI_ROUTES)
      },
      {
        path: 'elettromagnetismo-onde',
        loadChildren: () =>
          import('./pages/fisica/elettromagnetismo-onde/elettromagnetismo-onde.routes')
            .then(m => m.ELETTROMAGNETISMO_ONDE_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];