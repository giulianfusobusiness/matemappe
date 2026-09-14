import { Routes } from '@angular/router';
import { ElettromagnetismoOnde } from './elettromagnetismo-onde';
import { Conduttori } from './conduttori/conduttori';

export const ELETTROMAGNETISMO_ONDE_ROUTES: Routes = [
  { path: '', component: ElettromagnetismoOnde },
  { path: 'conduttori', component: Conduttori }
];