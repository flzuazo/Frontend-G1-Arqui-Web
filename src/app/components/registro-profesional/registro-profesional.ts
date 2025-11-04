import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./registro-profesional.css']
})
export class ProfessionalRegisterComponent {
  form: FormGroup;
  especialidades = [
    // Datos simulados
    'Medicina General',
    'Pediatría',
    'Ginecología',
    'Cardiología',
    'Odontología',
    'Dermatología'
  ];
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', Validators.required],
      colegiatura: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9()+ -]{6,}$')]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitted = true;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
