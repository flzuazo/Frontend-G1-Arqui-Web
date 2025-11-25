import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
// ⚠️ Importamos desde el archivo con el nombre que tienes actualmente
import { ProfesionalSaludService } from '../../services/profesionalSalud';
import { ProfesionalSaludDTO } from '../../model/profesional-salud';

@Component({
  selector: 'app-listar-profesionales',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './listar-profesionales.component.html',
  styleUrls: ['./listar-profesionales.component.css']
})
export class ListarProfesionalesComponent implements OnInit {

  dataSource: ProfesionalSaludDTO[] = [];
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'especialidad', 'colegiatura'];

  constructor(private profesionalService: ProfesionalSaludService) { }

  ngOnInit(): void {
    this.profesionalService.listar().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.error('Error al listar profesionales:', err)
    });
  }
}
