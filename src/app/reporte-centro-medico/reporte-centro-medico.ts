import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-centro-medico',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reporte-centro-medico.html',
  styleUrl: './reporte-centro-medico.css',
})
export class ReporteCentroMedico {
  fechaSeleccionada: string = '';
  nombreCentro: string = '';
  reporteGenerado: boolean = false;

  datosReporte: any[] = [];

  generarReporte() {
    // Datos simulados
    const todosLosDatos = [
      { paciente: 'Juan Pérez', fecha: '2025-11-01', centro: 'Clínica Lima', diagnostico: 'Gripe' },
      { paciente: 'María López', fecha: '2025-11-01', centro: 'Hospital Central', diagnostico: 'Fiebre' },
      { paciente: 'Carlos Díaz', fecha: '2025-11-02', centro: 'Clínica Lima', diagnostico: 'Dolor de cabeza' },
      { paciente: 'Ana Torres', fecha: '2025-11-03', centro: 'Hospital Sur', diagnostico: 'Covid-19' },
    ];

    // Filtrar según los valores ingresados
    this.datosReporte = todosLosDatos.filter(dato =>
      (!this.fechaSeleccionada || dato.fecha === this.fechaSeleccionada) &&
      (!this.nombreCentro || dato.centro.toLowerCase().includes(this.nombreCentro.toLowerCase()))
    );

    this.reporteGenerado = true;
  }
}
