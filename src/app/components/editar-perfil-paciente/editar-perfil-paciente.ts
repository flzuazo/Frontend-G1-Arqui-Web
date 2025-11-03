import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-editar-perfil-paciente',
  templateUrl: './editar-perfil-paciente.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./editar-perfil-paciente.css']
})
export class ProfileComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      fechaNacimiento: ['', Validators.required],
      sexo: ['M', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9()+ -]{6,}$')]],
      correo: ['', [Validators.required, Validators.email]],
      alergias: ['']
    });
  }

  setSexo(v: 'M' | 'F') {
    this.form.get('sexo')?.setValue(v);
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
