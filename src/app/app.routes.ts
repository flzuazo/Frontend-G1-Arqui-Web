import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ReporteCentroMedico } from './components/reporte-centro-medico/reporte-centro-medico';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';
import { EmitirReceta } from './components/emitir-receta/emitir-receta';
import { RegistroCentroMedico } from './components/registro-centro-medico/registro-centro-medico';
import {RegistroPaciente} from './components/registro-paciente/registro-paciente';
import {RegistroConsulta} from './components/registro-consulta/registro-consulta';



export const routes: Routes = [
  { path: '', component: Login },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
  { path: 'emitir-receta', component: RegistroCentroMedico },
  { path: 'registro-centro-medico', component: RegistroCentroMedico },
  { path: 'registro-paciente', component: RegistroPaciente },
  { path: 'registro-consulta', component: RegistroConsulta },
];
