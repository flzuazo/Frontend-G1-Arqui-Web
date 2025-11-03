import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /** Obtiene el historial médico de un paciente */
  getHistorial(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pacientes/${pacienteId}/historial`);
  }
}
