import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProfesionalSalud } from '../model/profesional-salud';

@Injectable({ providedIn: 'root' })
export class ProfesionalSaludService {

  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarProfesional(dto: ProfesionalSalud): Observable<ProfesionalSalud> {
    return this.http.post<ProfesionalSalud>(`${this.base}/nuevo_profesionalsalud`, dto);
  }
  listar(): Observable<ProfesionalSalud[]> {
    return this.http.get<ProfesionalSalud[]>(`${this.base}/profesionales`);
  }
}
