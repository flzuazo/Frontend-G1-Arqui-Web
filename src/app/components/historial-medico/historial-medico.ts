import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HistorialService } from '../../services/historial.service'; // usamos tu propio servicio
import { Inject } from '@angular/core';


@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './historial-medico.html',
  styleUrls: ['./historial-medico.css'],
})
export class HistorialMedico {
  searchText: string = '';
  consultas: any[] = [];
  filteredConsultas: any[] = [];

  // ✅ Inyectamos tu nuevo servicio en lugar de ApiService
constructor(@Inject(HistorialService) private historialService: HistorialService) {
  this.buscarHistorial(1);
}


  buscarHistorial(pacienteId: number) {
    this.historialService.getHistorial(pacienteId).subscribe({
      next: (data: any[]) => {
        this.consultas = data;
        this.filtrar();
      },
      error: (err: any) => console.error('No se pudo cargar el historial:', err),
    });
  }

  filtrar() {
    this.filteredConsultas = this.consultas.filter(
      (c) => !this.searchText || c.fechaConsulta.includes(this.searchText)
    );
  }
}
