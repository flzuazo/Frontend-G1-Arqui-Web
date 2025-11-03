import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-centro-medico',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro-centro-medico.html',
  styleUrl: './registro-centro-medico.css'
})
export class RegistroCentroMedico {
  model = {
    nombre: '',
    direccion: '',
    telefono: ''
  };

  registrar() {
    // Aquí harías la llamada a tu servicio/endpoint
    console.log('Registrar Centro Médico', this.model);
    // ejemplo de limpieza:
    // this.model = { nombre:'', direccion:'', telefono:'' };
  }

  volver() {
    history.back();
  }
}
