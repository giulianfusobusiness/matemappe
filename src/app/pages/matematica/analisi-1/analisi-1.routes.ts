import { Routes } from '@angular/router';

import { Analisi1 } from './analisi-1';
import { ThUnicitaLimite } from './th-unicita-limite/th-unicita-limite';
import { ThPermanenzaSegno } from './th-permanenza-segno/th-permanenza-segno';
import { ThInversoPermanenzaSegno } from './th-inverso-permanenza-segno/th-inverso-permanenza-segno';
import { ThConfronto } from './th-confronto/th-confronto';

export const ANALISI_1_ROUTES: Routes = [
  { path: '', component: Analisi1 },
  {
    path: 'teorema-unicita-limite',
    component: ThUnicitaLimite
  },
  {
    path: 'teorema-permanenza-segno',
    component: ThPermanenzaSegno
  },
  {
    path: 'teorema-inverso-permanenza-segno',
    component: ThInversoPermanenzaSegno
  },
  {
    path: 'teorema-confronto',
    component: ThConfronto
  }
];