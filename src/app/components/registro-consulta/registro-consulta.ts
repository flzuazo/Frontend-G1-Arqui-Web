import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Consulta } from '../../models/consulta';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-registro-consulta',
  templateUrl: './registro-consulta.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./registro-consulta.css']
})
export class RegistroConsulta {
  consulta: Consulta = new Consulta();

  constructor(private api: ApiService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Complete los campos obligatorios.');
      return;
    }
    this.api.registrarConsulta(this.consulta).subscribe({
      next: () => {
        alert('Consulta registrada correctamente.');
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar consulta: ' + (err?.error?.message || err.message || 'Servidor'));
      }
    });
  }
}
