import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProfesionalSaludDTO } from '../model/profesional-salud';

@Injectable({ providedIn: 'root' })
export class ProfesionalSaludService {

  private base = environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarProfesional(dto: ProfesionalSaludDTO): Observable<ProfesionalSaludDTO> {
    return this.http.post<ProfesionalSaludDTO>(`${this.base}/nuevo_profesionalsalud`, dto);
  }

}
