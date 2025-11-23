import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { ActualizarAlergias } from './components/actualizar-alergias/actualizar-alergias';
import { RegistroCentroMedico } from './components/registro-centro-medico/registro-centro-medico';
import { RegistroPaciente } from './components/registro-paciente/registro-paciente';
import { HistorialMedico } from './components/historial-medico/historial-medico';
import { PacientesAtendidos } from './components/pacientes-atendidos/pacientes-atendidos';
import { EditarPerfilPaciente } from './components/editar-perfil-paciente/editar-perfil-paciente';
import { RegistroProfesional } from './components/registro-profesional/registro-profesional';

import { MenuPrincipalComponent } from './components/menu-principal/menu-principal';
import { RegistroMedicamentoComponent } from './components/registro-medicamento/registro-medicamento.component';
import { ReporteEspecialidadComponent } from './components/reporte-especialidad/reporte-especialidad.component';
import { ReporteCentroMedicoComponent } from './components/reporte-centro-medico/reporte-centro-medico'; // Nota: Usamos el nombre corregido de la clase
import { ListarMedicamentosComponent } from './components/listar-medicamentos/listar-medicamentos.component';
import { ListarProfesionalesComponent } from './components/listar-profesionales/listar-profesionales.component';

export const routes: Routes = [
  // Ruta por defecto (Login)
  { path: '', component: Login },

  // Menú Principal
  { path: 'menu', component: MenuPrincipalComponent },

  { path: 'actualizar-alergias', component: ActualizarAlergias },
  { path: 'registro-centro-medico', component: RegistroCentroMedico },
  { path: 'registro-profesional', component: RegistroProfesional },
  { path: 'registro-paciente', component: RegistroPaciente },
  { path: 'historial-medico', component: HistorialMedico },
  { path: 'pacientes-atendidos', component: PacientesAtendidos },
  { path: 'editar-perfil', component: EditarPerfilPaciente },
  { path: 'editar-perfil-paciente', component: EditarPerfilPaciente }, // Se mantiene por compatibilidad


  // HU: Reporte Centro Médico
  { path: 'reporte-centro-medico', component: ReporteCentroMedicoComponent },
  { path: 'reportes/centros', component: ReporteCentroMedicoComponent },

  // HU13: Reporte por Especialidad
  {
    path: 'informes/reporte-especialidad',
    component: ReporteEspecialidadComponent,
    data: { roles: ['ADMIN'] }
  },
  { path: 'reportes/especialidades', component: ReporteEspecialidadComponent },

  // HU14: Registro de Medicamento
  {
    path: 'medicamentos/registro',
    component: RegistroMedicamentoComponent,
    data: { roles: ['ADMIN'] }
  },
  // Compatibilidad con el menú
  { path: 'registro-medicamento', component: RegistroMedicamentoComponent },

  // HU15: Listar Medicamentos
  {
    path: 'medicamentos/catalogo',
    component: ListarMedicamentosComponent,
    data: { roles: ['ADMIN', 'DOCTOR'] }
  },
  { path: 'medicamentos/listar', component: ListarMedicamentosComponent },

  // Listar Profesionales
  { path: 'profesionales/listar', component: ListarProfesionalesComponent },

  // Ruta comodín para errores 404 (redirige al login)
  { path: '**', redirectTo: '' }
];
