import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private apiUrl = environment.apiURL + '/pacientes';

  constructor(private http: HttpClient) {}

  getHistorial(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${pacienteId}/historial`);
  }
}
