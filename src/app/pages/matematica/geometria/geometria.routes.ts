import { Routes } from '@angular/router';
import { Geometria } from './geometria';

export const GEOMETRIA_ROUTES: Routes = [
  {
    path: '',
    component: Geometria
  },
  {
    path: 'strutture-algebriche',
    loadChildren: () =>
      import('./strutture-algebriche/strutture-algebriche.routes')
        .then(m => m.STRUTTURE_ALGEBRICHE_ROUTES)
  }
];