import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./registro-paciente.css']
})
export class RegistroPacienteComponent {
  paciente = {
    nombres: '',
    apellidos: '',
    dni: '',
    fechaNacimiento: '',
    sexo: '',
    correo: ''
  };

  constructor(private http: HttpClient) {}

  registrarPaciente() {
    this.http.post('http://localhost:8080/api/pacientes', this.paciente)
      .subscribe({
        next: () => alert('Paciente registrado con éxito'),
        error: (err) => alert('Error al registrar paciente: ' + err.message)
      });
  }
}


