import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      dni: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{8}$')]],
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
    this.http.get<any>(`/api/pacientes/${idPaciente}`).subscribe(p => {
      this.form.reset({
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
    const idPaciente = 1; // Reemplázalo con el id real del paciente
    const payload = { ...this.form.getRawValue() };

    this.http.put(`/api/actualizar_paciente/${idPaciente}`, payload)
      .subscribe({
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
