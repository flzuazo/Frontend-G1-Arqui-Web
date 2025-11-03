import { Routes } from '@angular/router';
import { ReporteCentroMedico } from './components/reporte-centro-medico/reporte-centro-medico';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';

export const routes: Routes = [
  { path: '', redirectTo: 'reporte-centro-medico', pathMatch: 'full' },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
];
