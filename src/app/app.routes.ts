import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { MenuPrincipal } from './components/menu-principal/menu-principal';
import { RegistroPaciente } from './components/registro-paciente/registro-paciente';
import { HistorialMedico } from './components/historial-medico/historial-medico';
import { PacientesAtendidos } from './components/pacientes-atendidos/pacientes-atendidos';
import { EditarPerfilPaciente } from './components/editar-perfil-paciente/editar-perfil-paciente';
import { RegistroProfesional } from './components/registro-profesional/registro-profesional';
import { ListarProfesionalesComponent } from './components/listar-profesionales/listar-profesionales.component';
import { CambioContra } from './components/cambio-contraseña/cambio-contraseña';
import { RegistroConsulta } from './components/registro-consulta/registro-consulta';
import {ListarPaciente} from './components/listar-paciente/listar-paciente';

export const routes: Routes = [
  // LOGIN
  { path: '', component: Login },

  // MENÚ PRINCIPAL
  { path: 'menu', component: MenuPrincipal },

  // PACIENTE
  { path: 'registro-paciente', component: RegistroPaciente },
  { path: 'editar-perfil-paciente', component: EditarPerfilPaciente },

  // CONSULTAS
  { path: 'historial-medico', component: HistorialMedico },
  { path: 'pacientes-atendidos', component: PacientesAtendidos },
  { path: 'registro-consulta', component: RegistroConsulta },


  // PROFESIONAL
  { path: 'registro-profesional', component: RegistroProfesional },
  { path: 'doctores-disponibles', component: ListarProfesionalesComponent },

  // CAMBIO CONTRA
  { path: 'cambio-contraseña', component: CambioContra },
  { path: 'listar-paciente', component:ListarPaciente}
];
