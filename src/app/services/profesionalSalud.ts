import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProfesionalSalud } from '../model/profesional-salud';
import { ProfesionalSaludDTO } from '../model/profesional-salud';

@Injectable({ providedIn: 'root' })
export class ProfesionalSaludService {

  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarProfesional(dto: ProfesionalSalud): Observable<ProfesionalSalud> {
    return this.http.post<ProfesionalSalud>(`${this.base}/public/profesional`, dto);
  }
  listar(): Observable<ProfesionalSaludDTO[]> {
    return this.http.get<ProfesionalSaludDTO[]>(`${this.base}/profesionales`);
  }
}
