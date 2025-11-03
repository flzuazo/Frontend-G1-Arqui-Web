import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporte-centro-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte-centro-medico.html',
  styleUrls: ['./reporte-centro-medico.css']
})
export class ReporteCentroMedico {
  filtros = { fechaInicio: '', fechaFin: '' };
  reportes = [
    { nombre: 'Centro Médico: Hospital General', consultas: 10, doctores: 4 },
    { nombre: 'Centro de Especialidades', consultas: 11, doctores: 6 },
    { nombre: 'Clínica Salud', consultas: 8, doctores: 7 }
  ];

  buscarReporte() {
    console.log('Buscando reporte con:', this.filtros);
    alert('Búsqueda de reporte realizada con éxito.');
  }
}
