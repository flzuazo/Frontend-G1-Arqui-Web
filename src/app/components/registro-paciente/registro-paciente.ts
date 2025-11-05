import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Paciente } from '../../model/paciente';
import {ApiService} from '../../services/api';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.html',
   imports: [CommonModule, FormsModule],
  styleUrls: ['./registro-paciente.css']
})
export class RegistroPaciente {
  paciente: Paciente = new Paciente();
  tiposSangre = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(private api: ApiService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Complete los campos obligatorios correctamente.');
      return;
    }
    this.api.registrarPaciente(this.paciente).subscribe({
      next: (res) => {
        alert('Paciente registrado correctamente.'); // confirmación
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar paciente: ' + (err?.error?.message || err.message || 'Servidor'));
      }
    });
  }
}
