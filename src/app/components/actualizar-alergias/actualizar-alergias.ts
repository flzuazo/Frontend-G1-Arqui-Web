import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-alergias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-alergias.html',
  styleUrls: ['./actualizar-alergias.css']
})
export class ActualizarAlergias implements OnInit {
  private apiUrl = 'http://localhost:8080/api/paciente'; // ✅ Usa el endpoint de tu backend
  idPaciente = 1; // ⚠️ Cambia esto según el paciente logueado

  alergia = {
    idCentroMedico: '',
    idProfesional: '',
    fechaConsulta: '',
    alergias: '',
    diagnostico: '',
    tratamiento: ''
  };

  listaAlergias: any[] = [];
  editando: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerHistorial();
  }

  // 🔹 Carga los antecedentes y alergias del paciente
  obtenerHistorial() {
    this.http.get<any>(`${this.apiUrl}/${this.idPaciente}/historial`).subscribe({
      next: (data) => {
        this.listaAlergias = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Error al obtener historial', err);
      }
    });
  }

  // 🔹 Guardar o actualizar antecedentes/alergias
  guardar() {
    const body = { ...this.alergia };

    this.http.put(`${this.apiUrl}/${this.idPaciente}/historial`, body).subscribe({
      next: () => {
        alert('Historial actualizado correctamente.');
        this.obtenerHistorial();
        this.limpiar();
      },
      error: (err) => {
        console.error('Error al actualizar historial', err);
      }
    });
  }

  editar(index: number) {
    this.alergia = { ...this.listaAlergias[index] };
    this.editando = index;
  }

  eliminar(index: number) {
    if (confirm('¿Desea eliminar este registro?')) {
      this.listaAlergias.splice(index, 1);
      alert('Registro eliminado localmente (no afecta la base de datos).');
    }
  }

  limpiar() {
    this.alergia = {
      idCentroMedico: '',
      idProfesional: '',
      fechaConsulta: '',
      alergias: '',
      diagnostico: '',
      tratamiento: ''
    };
    this.editando = null;
  }

  protected guardarCambios() {

  }
}
