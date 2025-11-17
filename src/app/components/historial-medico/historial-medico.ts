import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HistorialService } from '../../services/historial.service';
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

  constructor(@Inject(HistorialService) private historialService: HistorialService) {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user && user.idPaciente) {
      this.buscarHistorial(user.idPaciente);
    }
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
