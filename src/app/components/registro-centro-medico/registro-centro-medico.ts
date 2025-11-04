import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-centro-medico',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registro-centro-medico.html',
  styleUrl: './registro-centro-medico.css'
})
export class RegistroCentroMedico {
  private readonly API_URL = 'http://localhost:8080/api/nuevo_centro_medico';

  model: { nombre: string; direccion: string; telefono: string } = {
    nombre: '',
    direccion: '',
    telefono: ''
  };

  cargando = false;
  okMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  registrar() {
    this.okMsg = '';
    this.errorMsg = '';

    // validación simple
    if (!this.model.nombre?.trim() || !this.model.direccion?.trim() || !this.model.telefono?.trim()) {
      this.errorMsg = 'Complete los campos obligatorios.';
      return;
    }

    this.cargando = true;

    this.http.post(this.API_URL, this.model /* , { withCredentials: true } */)
      .subscribe({
        next: (resp: any) => {
          this.okMsg = 'Centro médico registrado correctamente.';
          this.cargando = false;
          // limpia el formulario manteniendo la misma estructura del model
          this.model = { nombre: '', direccion: '', telefono: '' };
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'Error al registrar centro médico.';
          this.cargando = false;
        }
      });
  }
  volver() {
    // respeta tu botón "Volver"
    history.back();
  }
}
