import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { CommonModule } from '@angular/common'; // Necesario para módulos comunes
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-registro-medicamento',
  standalone: true,
  // Importamos lo necesario para formularios y módulos comunes
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-medicamento.component.html',
  styleUrls: ['./registro-medicamento.component.css']
})
export class RegistroMedicamentoComponent implements OnInit {

  // Objeto para enlazar los campos del formulario
  medicamento = {
    nombre: '',
    dosis: ''
  };

  // Variable para manejar la respuesta/mensajes al usuario
  mensaje: string = '';
  esError: boolean = false;

  // Inyectar el servicio de comunicación con el Backend
  constructor(private medicamentoService: MedicamentoService) { }

  ngOnInit(): void {
  }

  // Método asociado al botón 'Guardar'
  guardarMedicamento() {
    this.mensaje = ''; // Limpiar mensajes previos

    // Validar campos vacíos (Validación UI - Criterio de Aceptación)
    if (!this.medicamento.nombre || !this.medicamento.dosis) {
      this.mensaje = 'Error: Los campos Nombre y Dosis son obligatorios.';
      this.esError = true;
      return;
    }

    // Llamada al Back-end
    this.medicamentoService.registrar(this.medicamento).subscribe({
      next: (response) => {
        // Criterio de Aceptación: Confirmar registro con mensaje de éxito
        this.mensaje = 'Medicamento registrado con éxito.';
        this.esError = false;
        // Limpiar el formulario
        this.medicamento = { nombre: '', dosis: '' };
      },
      error: (err) => {
        // Error: Campos duplicados o de servidor
        this.mensaje = `Error al registrar: ${err.error.message || 'El medicamento ya existe o hubo un error de servidor.'}`;
        this.esError = true;
      }
    });
  }
}
