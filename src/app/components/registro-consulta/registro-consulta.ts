import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Paciente} from '../../model/paciente';
import {ProfesionalSaludDTO} from '../../model/profesional-salud';
import {Centromedico} from '../../model/centromedico';
import {Medicamento} from '../../model/medicamento';
import {ApiService} from '../../services/api';
import {Consulta} from '../../model/consulta';


@Component({
  selector: 'app-registro-consulta',
  templateUrl: './registro-consulta.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./registro-consulta.css']
})
export class RegistroConsulta implements OnInit {
  consultaForm!: FormGroup;

  pacientes: Paciente[] = [];
  profesionales: ProfesionalSaludDTO[] = [];
  centros: Centromedico[] = [];
  medicamentos: Medicamento[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarListas();
  }

  initForm() {
    this.consultaForm = this.fb.group({
      idPaciente: ['', Validators.required],
      idProfesional: ['', Validators.required],
      idCentroMedico: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      diagnosticos: this.fb.array([]),
      recetas: this.fb.array([])
    });
  }

  get diagnosticos(): FormArray {
    return this.consultaForm.get('diagnosticos') as FormArray;
  }

  get recetas(): FormArray {
    return this.consultaForm.get('recetas') as FormArray;
  }

  addDiagnostico() {
    this.diagnosticos.push(this.fb.control('', Validators.required));
  }

  removeDiagnostico(index: number) {
    this.diagnosticos.removeAt(index);
  }

  addReceta() {
    const recetaGroup = this.fb.group({
      indicaciones: ['', Validators.required],
      medicamentos: this.fb.array([])
    });
    this.recetas.push(recetaGroup);
  }

  addMedicamento(indexReceta: number) {
    const meds = this.recetas.at(indexReceta).get('medicamentos') as FormArray;
    meds.push(this.fb.control('', Validators.required));
  }

  removeMedicamento(indexReceta: number, indexMed: number) {
    const meds = this.recetas.at(indexReceta).get('medicamentos') as FormArray;
    meds.removeAt(indexMed);
  }

  cargarListas() {
    this.api.listarPacientes().subscribe(r => this.pacientes = r);
    this.api.listarProfesionales().subscribe(r => this.profesionales = r);
    this.api.listarCentros().subscribe(r => this.centros = r);
    this.api.listarMedicamentos().subscribe(r => this.medicamentos = r);
  }

  onSubmit() {
    if (this.consultaForm.invalid) return;

    const consulta: Consulta = this.consultaForm.value;

    this.api.registrarConsulta(consulta).subscribe({
      next: r => alert('Consulta registrada correctamente'),
      error: e => alert('Error al registrar consulta')
    });
  }
}
