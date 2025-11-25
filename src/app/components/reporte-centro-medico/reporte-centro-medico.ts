import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReporteService } from '../../services/reporte.service';
import { ReporteCentroDTO } from '../../model/reporte-centro-dto';

@Component({
  selector: 'app-reporte-centro-medico',
  standalone: true,
  imports: [CommonModule, MatTableModule], // Agregamos MatTableModule
  templateUrl: './reporte-centro-medico.html',
  styleUrls: ['./reporte-centro-medico.css']
})
export class ReporteCentroMedicoComponent implements OnInit {

  dataSource: ReporteCentroDTO[] = [];
  displayedColumns: string[] = ['nombre', 'cantidad'];

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.listarReporte();
  }

  listarReporte() {
    this.reporteService.listarReporteCentro().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.error('Error al cargar reporte:', err)
    });
  }
}

export class ReporteCentroMedico {
}
