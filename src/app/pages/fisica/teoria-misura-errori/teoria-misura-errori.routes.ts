import { Routes } from '@angular/router';

import { TeoriaMisuraErrori } from './teoria-misura-errori';
import { TeoriaDellaMisura } from './teoria-della-misura/teoria-della-misura';

export const TEORIA_MISURA_ERRORI_ROUTES: Routes = [
  {
    path: '',
    component: TeoriaMisuraErrori
  },
  {
    path: 'teoria-della-misura',
    component: TeoriaDellaMisura
  }
];