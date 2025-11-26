import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-registro-medicamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-medicamento.component.html'
})
export class RegistroMedicamentoComponent implements OnInit {

  medicamento = {
    nombre: '',
    dosis: ''
  };

  mensaje: string = '';
  esError: boolean = false;

  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
  }

  guardarMedicamento() {
    this.mensaje = '';

    if (!this.medicamento.nombre || !this.medicamento.dosis) {
      this.mensaje = 'Error: Los campos Nombre y Dosis son obligatorios.';
      this.esError = true;
      return;
    }

    this.medicamentoService.registrar(this.medicamento).subscribe({
      next: (response) => {
        this.mensaje = 'Medicamento registrado con éxito.';
        this.esError = false;
        this.medicamento = { nombre: '', dosis: '' };
      },
      error: (err) => {
        this.mensaje = `Error al registrar: ${err.error?.message || 'El medicamento ya existe o hubo un error de servidor.'}`;
        this.esError = true;
      }
    });
  }
}
