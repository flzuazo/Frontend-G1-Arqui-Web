import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { Consulta } from '../model/consulta';
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
    return this.http.post<Paciente>(`${this.base}/pacientes`, p);
  }

  registrarConsulta(c: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.base}/consultas`, c);
  }

  // ===== HU12 =====
  validarPacienteExiste(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/exists/${id}`);
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
    return this.http.get<PacienteHistorialItem[]>(`${this.base}/paciente/historial/registros/${id}`);
  }

  eliminarRegistroHistorial(registroId: number) {
    return this.http.delete<void>(`${this.base}/paciente/historial/registros/${registroId}`);
  }


}
