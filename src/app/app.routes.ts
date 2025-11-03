import { Routes } from '@angular/router';
import { HistorialMedico } from './components/historial-medico/historial-medico';

export const routes: Routes = [
  { path: '', redirectTo: 'historial', pathMatch: 'full' },
  { path: 'historial', component: HistorialMedico },
];
