import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { CentroMedico } from '../model/centromedico';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {PacienteHistorialDTO, PacienteHistorialResponse,PacienteHistorialItem} from '../model/paciente-historial';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarPaciente(p: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/nuevo_paciente`, p);
  }
  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.base}/listar_pacientes`);
  }

  buscarPorDni(dni: string) {
    return this.http.get<Paciente>(`${this.base}/paciente_dni/${dni}`);
  }

  registrarcentromedico(cm: CentroMedico): Observable<CentroMedico> {
    return this.http.post<CentroMedico>(`${this.base}/nuevo_centro_medico`, cm);
  }
}

