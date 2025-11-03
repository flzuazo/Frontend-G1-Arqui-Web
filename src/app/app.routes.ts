import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ReporteCentroMedico } from './components/reporte-centro-medico/reporte-centro-medico';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
];
