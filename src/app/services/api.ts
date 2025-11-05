import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
>>>>>>> main
import { Paciente } from '../model/paciente';
import { Consulta } from '../model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  registrarPaciente(p: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/pacientes`, p);
  }

  registrarConsulta(c: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.base}/consultas`, c);
  }

}
