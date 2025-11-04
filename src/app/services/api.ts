import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/paciente';
import { Consulta } from '../models/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = '/api'; // ajuste si tu base es otra

  constructor(private http: HttpClient) {}

  registrarPaciente(p: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/pacientes`, p);
  }

  registrarConsulta(c: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.base}/consultas`, c);
  }

}
