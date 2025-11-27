import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {ConsultaService} from '../../services/consulta.service';
import {Consulta} from '../../model/consulta';
import { ApiService } from '../../services/api';


@Component({
  selector: 'app-registro-consulta',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './registro-consulta.html',
  styleUrl: './registro-consulta.css',
})
export class RegistroConsulta {
  consultaForm: FormGroup;

  showDiagnostico = false;
  showReceta = false;

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaService,
    private apiService: ApiService
  ) {
    this.consultaForm = this.fb.group({
      idConsulta: [null], // opcional, puede dejarse nulo y lo genera el backend
      dniPaciente: [null, [Validators.required, Validators.minLength(8)]],
      idPaciente: [null], // ← ya NO es ingresado manualmente
      idProfesional: [null, [Validators.required, Validators.min(1)]],
      idCentroMedico: [null, [Validators.required, Validators.min(1)]],
      fechaConsulta: [null, [Validators.required, this.notFutureDateValidator]],
      diagnostico: [''],
      receta: ['']
    });
  }

  ngOnInit(): void {
    const idProf = localStorage.getItem('idProfesional');

    if (idProf) {
      this.consultaForm.patchValue({
        idProfesional: Number(idProf)
      });
    }
  }

  // Getters para template (errores)
  get idPaciente(): AbstractControl | null { return this.consultaForm.get('idPaciente'); }
  get idProfesional(): AbstractControl | null { return this.consultaForm.get('idProfesional'); }
  get idCentroMedico(): AbstractControl | null { return this.consultaForm.get('idCentroMedico'); }
  get fechaConsulta(): AbstractControl | null { return this.consultaForm.get('fechaConsulta'); }
  get dniPaciente(): AbstractControl | null { return this.consultaForm.get('dniPaciente'); } // ← AGREGAR

  toggleDiagnostico(): void {
    this.showDiagnostico = !this.showDiagnostico;
    // Si se esconde y está vacío, limpiamos el control (opcional)
    if (!this.showDiagnostico) {
      // this.consultaForm.get('diagnostico')?.setValue('');
    }
  }

  toggleReceta(): void {
    this.showReceta = !this.showReceta;
    if (!this.showReceta) {
      // this.consultaForm.get('receta')?.setValue('');
    }
  }

  onSubmit(): void {
    if (this.consultaForm.invalid) {
      this.consultaForm.markAllAsTouched();
      return;
    }

    const dni = this.consultaForm.value.dniPaciente;   // ← OBTENER DNI DIGITADO

    // 1. Buscar paciente por DNI
    this.apiService.buscarPorDni(dni).subscribe({
      next: (paciente) => {

        if (!paciente) {
          alert("No se encontró un paciente con ese DNI");
          return;
        }

        // 2. Insertar ID real para el backend
        this.consultaForm.patchValue({ idPaciente: paciente.idPaciente }); // ← AGREGAR

        let dto: Consulta = { ...this.consultaForm.value };

        // 3. Convertir fecha a YYYY-MM-DD
        if (dto.fechaConsulta) {
          dto.fechaConsulta = new Date(dto.fechaConsulta)
            .toISOString()
            .split('T')[0]; // ← SE MANTIENE PERO SE USA CON EL NUEVO DTO
        }

        console.log("Enviando DTO:", dto);

        // 4. Registrar consulta
        this.consultaService.registrarConsulta(dto).subscribe({
          next: (resp) => {
            console.log("Consulta registrada:", resp);
            alert("Consulta registrada correctamente");
            this.consultaForm.reset();
          },
          error: (err) => {
            console.error(err);
            alert("Error al registrar la consulta");
          }
        });
      },

      error: (err) => {
        console.error(err);
        alert("Error buscando al paciente por DNI");
      }
    });
  }


  // Validador personalizado: no permitir fecha futura
  notFutureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) { return null; }
    const date = (value instanceof Date) ? value : new Date(value);
    const today = new Date();
    // Normalizamos horas para comparar solo fecha
    today.setHours(0,0,0,0);
    date.setHours(0,0,0,0);
    if (date > today) {
      return { futureDate: true };
    }
    return null;
  }
}
