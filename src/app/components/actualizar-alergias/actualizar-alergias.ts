import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-alergias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-alergias.html',
  styleUrls: ['./actualizar-alergias.css']
})
export class ActualizarAlergias {
  alergia = {
    idCentroMedico: '',
    idProfesional: '',
    fechaConsulta: '',
    alergias: '',
    diagnostico: '',
    tratamiento: ''
  };

  guardar() {
    console.log('Datos guardados:', this.alergia);
    alert('Información de alergias actualizada correctamente.');
  }
}
