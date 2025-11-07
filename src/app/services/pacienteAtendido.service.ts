import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = environment.apiURL + '/doctor';

  constructor(private http: HttpClient) {}

  listarPacientesAtendidos(idProfesional: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idProfesional}/pacientes`);
  }
}
