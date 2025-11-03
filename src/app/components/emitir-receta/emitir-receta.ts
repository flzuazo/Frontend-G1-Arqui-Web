import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Drug = 'Paracetamol' | 'Ibuprofeno' | 'Antibiótico' | 'Otro';

@Component({
  selector: 'app-emitir-receta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './emitir-receta.html',
  styleUrl: './emitir-receta.css'
})
export class EmitirReceta {
  form = {
    consulta: '',
    fecha: '',
    medicamento: '' as Drug | '',
    dosis: '',
    indicaciones: ''
  };

  selectDrug(drug: Drug) {
    this.form.medicamento = drug;
  }

  agregarMedicamento() {
    // aquí podrías empujar a un arreglo si luego quieres lista dinámica
    console.log('Agregar otro medicamento', this.form);
  }

  volver() {
    // si usas Router, cámbialo por navigate; esto cumple el mismo efecto
    history.back();
  }
}
