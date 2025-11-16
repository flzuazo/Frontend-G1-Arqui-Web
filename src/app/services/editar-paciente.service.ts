import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Paciente, PacienteUpdateDTO} from '../model/paciente';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditarPacienteService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  // GET /api/pacientes/{id}
  obtenerPaciente(id: number) {
    return this.http.get<any>(`${this.baseUrl}/pacientes/${id}`);
  }

  // PUT /api/actualizar_paciente/{id}
  actualizarPaciente(id: number, data: PacienteUpdateDTO): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.baseUrl}/actualizar_paciente/${id}`, data);
  }
}
