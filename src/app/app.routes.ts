import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { ReporteCentroMedico } from './components/reporte-centro-medico/reporte-centro-medico';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';
import { EmitirReceta } from './components/emitir-receta/emitir-receta';
import { RegistroCentroMedico } from './components/registro-centro-medico/registro-centro-medico';
import { RegistroMedicamentoComponent } from './components/registro-medicamento/registro-medicamento.component';
import { ListarMedicamentosComponent } from './components/listar-medicamentos/listar-medicamentos.component';
import { ReporteEspecialidadComponent } from './components/reporte-especialidad/reporte-especialidad.component';
import { RegistroPaciente } from './components/registro-paciente/registro-paciente';
import { RegistroConsulta } from './components/registro-consulta/registro-consulta';
import { HistorialMedico } from './components/historial-medico/historial-medico'; // tu componente
import { PacientesAtendidos } from './components/pacientes-atendidos/pacientes-atendidos';
import { EditarPerfilPaciente } from './components/editar-perfil-paciente/editar-perfil-paciente';
import { MenuPrincipal } from './components/menu-principal/menu-principal';
import { RegistroProfesional } from './components/registro-profesional/registro-profesional';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'menu', component: MenuPrincipal },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
  { path: 'emitir-receta', component: EmitirReceta },
  { path: 'registro-centro-medico', component: RegistroCentroMedico },
  // HU13: Reporte por Especialidad (Solo ADMIN)
  {
    path: 'informes/reporte-especialidad',
    component: ReporteEspecialidadComponent,
    data: { roles: ['ADMIN'] },
  },
  // HU14: Registro de Medicamento (Solo ADMIN)
  {
    path: 'medicamentos/registro',
    component: RegistroMedicamentoComponent,
    data: { roles: ['ADMIN'] },
  },
  // HU15: Listar Medicamentos (ADMIN y DOCTOR)
  {
    path: 'medicamentos/catalogo',
    component: ListarMedicamentosComponent,
    data: { roles: ['ADMIN', 'DOCTOR'] },
  },
  { path: 'editar-perfil', component: EditarPerfilPaciente },

  { path: '', component: Login },
  { path: 'menu', component: MenuPrincipal },
  { path: 'reporte-centro-medico', component: ReporteCentroMedico },
  { path: 'actualizar-alergias', component: ActualizarAlergias },
  { path: 'emitir-receta', component: EmitirReceta },
  { path: 'registro-centro-medico', component: RegistroCentroMedico },
  // HU06: Registro de profesional
  { path: 'registro-profesional', component: RegistroProfesional },
  // HU13: Reporte por Especialidad (Solo ADMIN)
  {
    path: 'informes/reporte-especialidad',
    component: ReporteEspecialidadComponent,
    data: { roles: ['ADMIN'] },
  },
  // HU14: Registro de Medicamento (Solo ADMIN)
  {
    path: 'medicamentos/registro',
    component: RegistroMedicamentoComponent,
    data: { roles: ['ADMIN'] },
  },
  // HU15: Listar Medicamentos (ADMIN y DOCTOR)
  {
    path: 'medicamentos/catalogo',
    component: ListarMedicamentosComponent,
    data: { roles: ['ADMIN', 'DOCTOR'] },
  },
  { path: 'editar-perfil-paciente', component: EditarPerfilPaciente },

  { path: 'registro-paciente', component: RegistroPaciente },
  { path: 'registro-consulta', component: RegistroConsulta },
  { path: 'historial-medico', component: HistorialMedico },
  { path: 'pacientes-atendidos', component: PacientesAtendidos },
  { path: 'editar-perfil', component: EditarPerfilPaciente },
];
