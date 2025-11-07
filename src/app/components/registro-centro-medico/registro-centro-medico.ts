import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Centromedico } from '../../model/centromedico';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-centro-medico',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro-centro-medico.html',
  styleUrl: './registro-centro-medico.css'
})
export class RegistroCentroMedico {

  model: Centromedico = {
    nombreCentro: '',
    direccion: '',
    telefono: ''
  };

  cargando = false;
  okMsg = '';
  errorMsg = '';

  constructor(private api: ApiService) {}

  registrarcentromedico() {
    this.okMsg = '';
    this.errorMsg = '';

    // validación simple
    if (!this.model.nombreCentro?.trim() || !this.model.direccion?.trim() || !this.model.telefono?.trim()) {
      this.errorMsg = 'Complete los campos obligatorios.';
      return;
    }

    this.cargando = true;

    this.api.registrarcentromedico(this.model).subscribe({
      next: () => {
        this.okMsg = 'Centro médico registrado correctamente.';
        this.model = { nombreCentro: '', direccion: '', telefono: '' }; // limpia
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Error al registrar centro médico.';
      },
      complete: () => (this.cargando = false)
    });
  }

  volver() {
    history.back();
  }
}
