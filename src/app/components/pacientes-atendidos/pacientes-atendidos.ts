import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-pacientes-atendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes-atendidos.html',
  styleUrls: ['./pacientes-atendidos.css']
})
export class PacientesAtendidos implements OnInit {
  pacientes: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    // Puedes dejarlo vacío si prefieres usar el botón
    // o llamar a this.mostrarPacientes() para carga automática
  }

  // ✅ ESTE ES EL MÉTODO QUE FALTABA
  mostrarPacientes(): void {
    this.loading = true;
    this.errorMsg = '';

    this.apiService.listarPacientesAtendidos(1).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudieron cargar los pacientes.';
        this.loading = false;
      }
    });
  }
}
