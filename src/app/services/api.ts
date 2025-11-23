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
    return this.http.post<Paciente>(`${this.base}/pacientes`, p);
  }

  // ===== HU12 =====
  validarPacienteExiste(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.base}/paciente/validar/${id}`);
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
    return this.http.get<PacienteHistorialItem[]>(`${this.base}/paciente/registros/${id}`);
  }

  obtenerPaciente(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/pacientes/${id}`);
  }


  eliminarRegistroHistorial(registroId: number) {
    return this.http.delete<void>(`${this.base}/paciente/historial/${registroId}`);
  }

  registrarcentromedico(cm: CentroMedico): Observable<CentroMedico> {
    return this.http.post<CentroMedico>(`${this.base}/nuevo_centro_medico`, cm);
  }
}

