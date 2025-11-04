import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-listar-medicamentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-medicamentos.component.html',
  styleUrls: ['./listar-medicamentos.component.css']
})
export class ListarMedicamentosComponent implements OnInit {

  medicamentosOriginal: any[] = [];
  medicamentosMostrados: any[] = [];

  filtroNombre: string = '';

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos() {
    this.medicamentoService.listar().subscribe({
      next: (data) => {
        this.medicamentosOriginal = data;
        this.aplicarFiltro();
      },
      error: (err) => {
        console.error('Error al cargar medicamentos:', err);
      }
    });
  }

  aplicarFiltro() {
    if (!this.filtroNombre) {
      this.medicamentosMostrados = this.medicamentosOriginal;
    } else {
      const termino = this.filtroNombre.toLowerCase();
      this.medicamentosMostrados = this.medicamentosOriginal.filter(med =>
        med.nombre.toLowerCase().includes(termino)
      );
    }
  }
}
