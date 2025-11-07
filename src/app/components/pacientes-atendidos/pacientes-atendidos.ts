import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/pacienteAtendido.service';

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

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    // Si quieres cargar automáticamente:
    // this.mostrarPacientes();
  }

  mostrarPacientes(): void {
    this.loading = true;
    this.errorMsg = '';

    this.pacienteService.listarPacientesAtendidos(1).subscribe({
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
