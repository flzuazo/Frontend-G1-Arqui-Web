import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private api: Api) {
    // Carga automática del historial del paciente con ID 1
    this.buscarHistorial(1);
  }

  buscarHistorial(pacienteId: number) {
    this.api.getHistorial(pacienteId).subscribe({
      next: (data) => {
        this.consultas = data;
        this.filtrar();
      },
      error: (err) => console.error('No se pudo cargar el historial:', err),
    });
  }

  filtrar() {
    this.filteredConsultas = this.consultas.filter(
      (c) => !this.searchText || c.fechaConsulta.includes(this.searchText)
    );
  }
}
