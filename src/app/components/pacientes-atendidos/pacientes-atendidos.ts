import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/pacienteAtendido.service';

@Component({
  selector: 'app-pacientes-atendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes-atendidos.html',
  styleUrls: ['./pacientes-atendidos.css'],
})
export class PacientesAtendidos implements OnInit {
  pacientes: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.mostrarPacientes();
  }

  mostrarPacientes(): void {
    this.loading = true;
    this.errorMsg = '';

    const user = JSON.parse(localStorage.getItem('user')!);

    if (!user || !user.idProfesional) {
      this.errorMsg = 'No se encontró el ID del profesional.';
      this.loading = false;
      return;
    }

    const profesionalId = user.idProfesional;

    this.pacienteService.listarPacientesAtendidos(profesionalId).subscribe({
      next: (data) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudieron cargar los pacientes.';
        this.loading = false;
      },
    });
  }
}
