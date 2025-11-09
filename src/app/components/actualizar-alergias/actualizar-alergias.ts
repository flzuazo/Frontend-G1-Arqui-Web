import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { PacienteHistorialDTO, PacienteHistorialResponse,PacienteHistorialItem} from '../../model/paciente-historial';

@Component({
  selector: 'app-actualizar-alergias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-alergias.html',
  styleUrls: ['./actualizar-alergias.css']
})
export class ActualizarAlergias {
  // form
  idPaciente: string = '';
  form: PacienteHistorialDTO = { antecedentes: '', alergias: '' };

  // estado UI
  validando = false;
  guardando = false;
  pacienteValido: boolean | null = null;
  okMsg = '';
  errorMsg = '';

  // mantenimiento
  historial: PacienteHistorialItem[] = [];
  // edición rápida (rellena el form con un registro existente)
  editRegistroId: number | null = null;

  constructor(private api: ApiService) {}

  private toNumId(): number | null {
    const n = Number(this.idPaciente);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  validarId() {
    this.okMsg = '';
    this.errorMsg = '';
    this.pacienteValido = null;
    this.historial = [];
    this.editRegistroId = null;

    const id = this.toNumId();
    if (!id) { this.errorMsg = 'Ingrese un Id de paciente válido.'; return; }

    this.validando = true;
    this.api.validarPacienteExiste(id).subscribe({
      next: (existe) => {
        this.pacienteValido = !!existe;
        if (existe) {
          this.okMsg = 'Paciente válido.';
          // cargar registros del historial para el mantenimiento
          this.cargarHistorial(id);
        } else {
          this.errorMsg = 'El Id no existe en la base de datos.';
        }
      },
      error: () => this.errorMsg = 'No se pudo validar el Id (backend).',
      complete: () => this.validando = false
    });
  }

  private cargarHistorial(id: number) {
    this.api.listarHistorialPaciente(id).subscribe({
      next: (items) => this.historial = items ?? [],
      error: () => this.errorMsg = 'No se pudo cargar el historial del paciente.'
    });
  }

  guardar() {
    this.okMsg = '';
    this.errorMsg = '';

    const id = this.toNumId();
    if (!id) { this.errorMsg = 'Valide primero un Id de paciente válido.'; return; }
    if (this.pacienteValido !== true) { this.errorMsg = 'Debe validar el Id antes de guardar.'; return; }
    if (!this.form.antecedentes.trim() && !this.form.alergias.trim()) {
      this.errorMsg = 'Ingrese al menos antecedentes o alergias.'; return;
    }

    this.guardando = true;

    // Aquí, llamamos al método PUT para actualizar el historial
    this.api.actualizarHistorialPaciente(id, this.form).subscribe({
      next: (_resp: PacienteHistorialResponse) => {
        this.okMsg = 'Historial actualizado correctamente.';
        this.editRegistroId = null;

        // Recargar historial después de la actualización
        this.cargarHistorial(id);

        // Limpiar el formulario solo después de guardar
        this.limpiarForm(); // Esto vacía el formulario
      },
      error: (err) => {
        if (err?.status === 400 && err?.error) {
          if (Array.isArray(err.error.errors)) {
            this.errorMsg = err.error.errors.map((e: any) => e.defaultMessage || e.message).join(' | ');
          } else if (err.error.message) {
            this.errorMsg = err.error.message;
          } else {
            this.errorMsg = 'Validación fallida al actualizar.';
          }
        } else {
          this.errorMsg = 'Error al actualizar el historial.';
        }
      },
      complete: () => this.guardando = false
    });
  }


  // Acciones de la tabla
  editar(item: PacienteHistorialItem) {
    // precargar form para editar (creará una NUEVA versión con PUT; si tu backend actualiza “ese” registro,
    // puedes enviar info adicional en el body y usar un endpoint PUT por registro)
    this.form = { antecedentes: item.antecedentes, alergias: item.alergias };
    this.editRegistroId = item.registroId;
    this.okMsg = ''; this.errorMsg = '';
    this.errorMsg = ''; // Limpiamos el mensaje de error
  }

  eliminar(item: PacienteHistorialItem) {
    if (!confirm('¿Eliminar este registro del historial?')) return;
    this.api.eliminarRegistroHistorial(item.registroId).subscribe({
      next: () => {
        this.okMsg = 'Registro eliminado.';
        const id = this.toNumId(); if (id) this.cargarHistorial(id);
      },
      error: () => this.errorMsg = 'No se pudo eliminar el registro.'
    });
  }

  limpiarForm() {
    this.form = { antecedentes: '', alergias: '' };
    this.editRegistroId = null;
  }
}
