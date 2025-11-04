import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private apiUrl = environment.apiURL + '/reportes/especialidades';

  constructor(private http: HttpClient) { }

  // HU13: GET /api/reportes/especialidades
  generarReporteEspecialidad(fechaInicio: string, fechaFin: string) {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
