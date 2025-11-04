import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-reporte-especialidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte-especialidad.component.html',
  styleUrls: ['./reporte-especialidad.component.css']
})
export class ReporteEspecialidadComponent implements OnInit {

  // Propiedades para capturar el rango de fechas (usando formato YYYY-MM-DD para el backend)
  fechaInicio: string = '';
  fechaFin: string = '';

  reporteData: any[] = [];
  mensaje: string = '';

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {

  }

  generarReporte() {
    this.reporteData = [];
    this.mensaje = '';

    // Validación básica de que ambas fechas están presentes
    if (!this.fechaInicio || !this.fechaFin) {
      this.mensaje = 'Debe seleccionar una fecha de inicio y una fecha fin.';
      return;
    }

    this.reporteService.generarReporteEspecialidad(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.reporteData = data;

        // Criterio de Aceptación: Rango sin consultas → lista vacía
        if (this.reporteData.length === 0) {
          this.mensaje = 'Rango de fechas sin consultas: lista vacía.';
        }
      },
      error: (err) => {
        console.error('Error al generar reporte:', err);
        this.mensaje = 'Error de conexión o de servidor al generar el reporte.';
      }
    });
  }

  exportarJson() {
    if (this.reporteData.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const dataStr = JSON.stringify(this.reporteData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal para forzar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte_especialidades_${this.fechaInicio}_a_${this.fechaFin}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
