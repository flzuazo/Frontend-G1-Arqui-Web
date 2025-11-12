import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, Validators, AbstractControl, FormGroup} from '@angular/forms';
import { ApiService } from '../../services/api';
import { Paciente } from '../../model/paciente';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // opcional

@Component({
  selector: 'registro-paciente',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatSnackBarModule ],
  templateUrl: './registro-paciente.html',
  styleUrls: ['./registro-paciente.css']
})
export class RegistroPaciente {
  pacienteForm: FormGroup;
  tiposSangre = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snack?: MatSnackBar // si Material no está presente, angular inyectará undefined
  ) {
    this.pacienteForm = this.fb!.group({
      // FormGroup reactivo
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // 8 dígitos
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      direccion: [''],
      telefono: ['', Validators.pattern(/^\d{7,9}$/)], // opcional 7-9 dígitos
      email: ['', Validators.email],
      tipoSangre: [''],
      alergias: ['']
    });
  }

  get c(): { [key: string]: AbstractControl } { return this.pacienteForm.controls; }

  // enviar formulario
  registrar() {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      this.showMsg('Corrija los campos requeridos.', true);
      return;
    }

    const payload: Paciente = {
      nombres: this.c['nombres'].value,
      apellidos: this.c['apellidos'].value,
      dni: this.c['dni'].value,
      fechaNacimiento: this.c['fechaNacimiento'].value,
      sexo: this.c['sexo'].value,
      direccion: this.c['direccion'].value,
      telefono: this.c['telefono'].value,
      email: this.c['email'].value,
      tipoSangre: this.c['tipoSangre'].value,
      alergias: this.c['alergias'].value,
      antecedentes: ''
    };

    this.api.registrarPaciente(payload).subscribe({
      next: () => {
        this.showMsg('Paciente registrado correctamente.');
        this.pacienteForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        // 400 -> validar si es por DNI duplicado (backend puede enviar mensaje)
        if (err.status === 400) {
          const text = this.extractServerMessage(err);
          if (text?.toLowerCase().includes('dni')) {
            this.showMsg('El DNI ya está registrado.', true);
            return;
          }
          this.showMsg('Datos inválidos. Revise el formulario.', true);
          return;
        }
        if (err.status === 0) {
          this.showMsg('No se puede conectar al servidor.', true);
        } else {
          this.showMsg(`Error servidor: ${err.statusText || err.message}`, true);
        }
      }
    });
  }

  private extractServerMessage(err: HttpErrorResponse): string | null {
    if (!err.error) return null;
    if (typeof err.error === 'string') return err.error;
    return err.error.message || err.error.mensaje || null;
  }

  private showMsg(msg: string, isError = false) {
    if (this.snack) {
      this.snack.open(msg, 'Cerrar', { duration: 3500, panelClass: isError ? ['snack-error'] : ['snack-success'] });
    } else {
      // fallback sin Angular Material
      if (isError) alert(`Error: ${msg}`); else alert(msg);
    }
  }
}
