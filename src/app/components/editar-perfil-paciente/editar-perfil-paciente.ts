import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditarPacienteService } from '../../services/editar-paciente.service';
import { Paciente, PacienteUpdateDTO } from '../../model/paciente';

@Component({
  selector: 'app-editar-perfil-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil-paciente.html',
  styleUrls: ['./editar-perfil-paciente.css']
})
export class EditarPerfilPaciente implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private svc: EditarPacienteService) {
    this.form = this.fb.group({
      nombres:         [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      apellidos:       [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      dni:             [{ value: '', disabled: true }],
      fechaNacimiento: [{ value: '', disabled: true }, Validators.required],
      sexo:            [{ value: 'M', disabled: true }, Validators.required],
      tipoSangre:      [{ value: '', disabled: true }],   // <- añadido, solo lectura
      direccion:       [''],
      telefono:        ['', [Validators.required, Validators.pattern(/^[0-9()+\s-]{6,}$/)]],
      correo:          ['', [Validators.required, Validators.email]],
      alergias:        [{ value: '', disabled: true }]    // <- solo lectura
    });

  }

  ngOnInit(): void {
    const idPaciente = 1; //Number(localStorage.getItem('idPaciente') ?? 1);
    this.svc.obtenerPaciente(idPaciente).subscribe({
      next: (p: Paciente) => {
        // Normaliza fecha a YYYY-MM-DD por si llega con hora
        const fecha = (p.fechaNacimiento || '').slice(0, 10);
        this.form.patchValue({
          nombres: p.nombres,
          apellidos: p.apellidos,
          dni: p.dni,
          fechaNacimiento: fecha,
          sexo: (p.sexo as any) || 'M',
          direccion: p.direccion ?? '',
          telefono: p.telefono ?? '',
          correo: p.email ?? '',          // <- email backend → correo UI
          alergias: p.alergias ?? ''
        });
      },
      error: (e) => this.alertError(e, 'No se pudo cargar el paciente')
    });
  }

  setSexo(v: 'M'|'F') {
    const c = this.form.get('sexo');
    if (!c || c.disabled) return;   // ← no permitir cambios
    c.setValue(v);
  }


  private normalizeDate(d: string): string {
    if (!d) return '';
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : new Date(d).toISOString().slice(0,10);
  }

  private buildPayload(): PacienteUpdateDTO {
    const v = this.form.getRawValue();
    return {
      nombres: v.nombres.trim(),
      apellidos: v.apellidos.trim(),
      fechaNacimiento: this.normalizeDate(v.fechaNacimiento),
      sexo: v.sexo,                       // si tu DTO no acepta 'O', valida aquí
      direccion: v.direccion?.trim() || '',
      telefono: v.telefono?.trim() || '',
      email: v.correo?.trim(),            // <- mapeo correo UI → email backend
      alergias: v.alergias?.trim() || ''
    };
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;
    const idPaciente = 1;//Number(localStorage.getItem('idPaciente') ?? 1);
    const payload = this.buildPayload();
    this.loading = true;

    this.svc.actualizarPaciente(idPaciente, payload).subscribe({
      next: () => { this.loading = false; alert('Perfil actualizado correctamente'); },
      error: (e) => { this.loading = false; this.alertError(e, 'Error al actualizar el perfil'); }
    });
  }

  private alertError(e: any, fallback: string) {
    console.error(e);
    const msg = e?.error?.message || e?.error?.error || e?.message || fallback;
    alert(msg);
  }
}
