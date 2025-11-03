import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-registro-consulta',
  templateUrl: './registro-consulta.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./registro-consulta.css']
})
export class RegistroConsultaComponent {
  consulta = {
    pacienteId: '',
    doctorId: '',
    fechaConsulta: '',
    diagnostico: '',
    tratamiento: ''
  };

  constructor(private http: HttpClient) {}

  registrarConsulta() {
    this.http.post('http://localhost:8080/api/consultas', this.consulta)
      .subscribe({
        next: () => alert('Consulta registrada con éxito'),
        error: (err) => alert('Error al registrar consulta: ' + err.message)
      });
  }
}
