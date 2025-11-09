import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditarPacienteService } from '../../services/editar-paciente.service';

@Component({
  selector: 'app-editar-perfil-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil-paciente.html',
  styleUrls: ['./editar-perfil-paciente.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private editarPacienteService: EditarPacienteService) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      dni: [''],
      fechaNacimiento: ['', Validators.required],
      sexo: ['M', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9()+ -]{6,}$')]],
      correo: ['', [Validators.required, Validators.email]],
      alergias: ['']
    });
  }

  ngOnInit() {
    const idPaciente = 1;
    this.editarPacienteService.obtenerPaciente(idPaciente).subscribe(p => {
      this.form.patchValue({
        nombres: p.nombres,
        apellidos: p.apellidos,
        dni: p.dni,
        fechaNacimiento: p.fechaNacimiento,
        sexo: p.sexo,
        direccion: p.direccion || '',
        telefono: p.telefono || '',
        correo: p.correo || '',
        alergias: p.alergias || ''
      });
    });
  }

  setSexo(v: 'M' | 'F') {
    this.form.get('sexo')?.setValue(v);
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    const idPaciente = 1;
    const payload = { ...this.form.getRawValue() };

    this.editarPacienteService.actualizarPaciente(idPaciente, payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Perfil actualizado correctamente');
      },
      error: () => {
        this.loading = false;
        alert('Error al actualizar el perfil');
      }
    });
  }
}
