import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfesionalSaludService } from '../../services/profesionalSalud';

@Component({
  selector: 'app-registro-profesional',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro-profesional.html',
  styleUrls: ['./registro-profesional.css']
})
export class RegistroProfesional {

  especialidades: string[] = [
    'Medicina General',
    'Pediatría',
    'Ginecología',
    'Cardiología',
    'Odontología',
    'Dermatología'
  ];

  form!: FormGroup;
  loading = false;
  okMsg = '';
  errMsg = '';

  constructor(
    private fb: FormBuilder,
    private srvProfesional: ProfesionalSaludService
  ) {
    this.form = this.fb.group({
      nombres:      ['', [Validators.required, Validators.minLength(2)]],
      apellidos:    ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', Validators.required],
      colegiatura:  ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9-]+$/)]],
      telefono:     ['', [Validators.required, Validators.pattern(/^[0-9()+\s-]{6,}$/)]],
      email:        ['', [Validators.required, Validators.email]]
    });
  }

  isInvalid(ctrl: string) {
    const c = this.form.get(ctrl);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  onSubmit() {
    this.okMsg = '';
    this.errMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.srvProfesional.registrarProfesional(this.form.value).subscribe({
      next: () => {
        this.okMsg = 'Profesional registrado correctamente.';
        this.form.reset();
      },
      error: () => this.errMsg = 'No se pudo registrar el profesional.',
      complete: () => this.loading = false
    });
  }

  volver() {
    history.back();
  }
}
