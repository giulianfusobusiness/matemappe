import { Routes } from '@angular/router';

import { StruttureAlgebriche } from './strutture-algebriche';
import { GruppoAbeliano } from './gruppo-abeliano/gruppo-abeliano';
import { SpazioVettoriale } from './spazio-vettoriale/spazio-vettoriale';

export const STRUTTURE_ALGEBRICHE_ROUTES: Routes = [
  {
    path: '',
    component: StruttureAlgebriche
  },
  {
    path: 'gruppo-abeliano',
    component: GruppoAbeliano
  },
    {
    path: 'spazio-vettoriale',
    component: SpazioVettoriale
  }
];