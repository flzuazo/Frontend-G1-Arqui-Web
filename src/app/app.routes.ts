import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ReporteCentroMedico } from './components/reporte-centro-medico/reporte-centro-medico';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';
import { EmitirReceta } from './components/emitir-receta/emitir-receta';
import { RegistroCentroMedico } from './components/registro-centro-medico/registro-centro-medico';
import { PacientesAtendidos } from './components/pacientes-atendidos/pacientes-atendidos';
import { HistorialMedico } from './components/historial-medico/historial-medico';


export const routes: Routes = [
  
  { path: '', component: Login },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
  { path: 'emitir-receta', component: EmitirReceta },
  { path: 'registro-centro-medico', component: RegistroCentroMedico },
  { path: 'pacientes-atendidos', component: PacientesAtendidos },
  { path: 'HistorialMedico', component: HistorialMedico },
];
