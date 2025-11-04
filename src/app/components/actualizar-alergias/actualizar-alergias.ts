import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-alergias',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './actualizar-alergias.html',
  styleUrls: ['./actualizar-alergias.css']
})
export class ActualizarAlergias implements OnInit {

  baseUrl = 'http://localhost:8080/api/alergias';
  listaAlergias: any[] = [];
  alergia = {
    id: null,
    idCentroMedico: '',
    idProfesional: '',
    fechaConsulta: '',
    alergias: '',
    diagnostico: '',
    tratamiento: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.http.get<any[]>(this.baseUrl).subscribe(data => {
      this.listaAlergias = data;
    });
  }

  guardar() {
    if (this.alergia.id) {
      // Actualizar
      this.http.put(`${this.baseUrl}/${this.alergia.id}`, this.alergia).subscribe(() => {
        alert('Alergia actualizada correctamente');
        this.listar();
        this.resetear();
      });
    } else {
      // Guardar nueva
      this.http.post(this.baseUrl, this.alergia).subscribe(() => {
        alert('Alergia guardada correctamente');
        this.listar();
        this.resetear();
      });
    }
  }

  editar(a: any) {
    this.alergia = { ...a };
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este registro?')) {
      this.http.delete(`${this.baseUrl}/${id}`).subscribe(() => {
        alert('Alergia eliminada correctamente');
        this.listar();
      });
    }
  }

  resetear() {
    this.alergia = {
      id: null,
      idCentroMedico: '',
      idProfesional: '',
      fechaConsulta: '',
      alergias: '',
      diagnostico: '',
      tratamiento: ''
    };
  }
}
