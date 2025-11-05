import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { Consulta } from '../model/consulta';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarPaciente(p: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.base}/nuevo_paciente`, p);
  }

  registrarConsulta(c: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.base}/consultas`, c);
  }

}