import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { Consulta } from '../model/consulta';
import { Centromedico } from '../model/centromedico';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {PacienteHistorialDTO, PacienteHistorialResponse,PacienteHistorialItem} from '../model/paciente-historial';
import {ProfesionalSaludDTO} from '../model/profesional-salud';
import {Medicamento} from '../model/medicamento';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarPaciente(p: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/pacientes`, p);
  }

  // ===== HU12 =====
  validarPacienteExiste(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/validar/${id}`);
  }

  actualizarHistorialPaciente(
    id: number,
    body: PacienteHistorialDTO
  ): Observable<PacienteHistorialResponse> {
    return this.http.put<PacienteHistorialResponse>(
      `${this.base}/paciente/historial/${id}`,
      body
    );
  }
  // NUEVOS: listar y eliminar registros del historial
  listarHistorialPaciente(id: number) {
    return this.http.get<PacienteHistorialItem[]>(`${this.base}/registros/${id}`);
  }

  eliminarRegistroHistorial(registroId: number) {
    return this.http.delete<void>(`${this.base}/registros/${registroId}`);
  }
    registrarcentromedico(cm: Centromedico): Observable<Centromedico> {
    return this.http.post<Centromedico>(`${this.base}/nuevo_centro_medico`, cm);
  }

  listarPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.base}/pacientes`);
  }

  listarProfesionales(): Observable<ProfesionalSaludDTO[]> {
    return this.http.get<ProfesionalSaludDTO[]>(`${this.base}/profesionales`);
  }

  listarCentros(): Observable<Centromedico[]> {
    return this.http.get<Centromedico[]>(`${this.base}/centros`);
  }

  listarMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.base}/medicamentos`);
  }

  registrarConsulta(data: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.base}/nueva_consulta`, data);
  }
}

