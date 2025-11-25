import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReporteService } from '../../services/reporte.service';
import { ReporteEspecialidadDTO } from '../../model/reporte-especialidad-dto';

@Component({
  selector: 'app-reporte-especialidad',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './reporte-especialidad.component.html',
  styleUrls: ['./reporte-especialidad.component.css']
})
export class ReporteEspecialidadComponent implements OnInit {

  // Variable para la tabla
  dataSource: ReporteEspecialidadDTO[] = [];
  displayedColumns: string[] = ['especialidad', 'pacientes'];

  constructor(private reporteService: ReporteService) { }

  ngOnInit(): void {
    // Carga automática al iniciar
    this.cargarReporte();
  }

  cargarReporte() {
    this.reporteService.listarReporteEspecialidad().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => {
        console.error('Error al cargar reporte:', err);
      }
    });
  }
}
