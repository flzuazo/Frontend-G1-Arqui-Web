import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReporteEspecialidadDTO } from '../model/reporte-especialidad-dto';
import { ReporteCentroDTO } from '../model/reporte-centro-dto';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  // URL base apuntando a /api/reportes
  private url = `${environment.apiURL}/reportes`;

  constructor(private http: HttpClient) { }


  generarReporteCentros(fechaInicio: string, fechaFin: string): Observable<any[]> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<any[]>(`${this.url}/centros`, { params });
  }

  generarReporteEspecialidad(fechaInicio: string, fechaFin: string): Observable<any[]> {
    let params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);
    return this.http.get<any[]>(`${this.url}/especialidades`, { params });
  }


  listarReporteEspecialidad(): Observable<ReporteEspecialidadDTO[]> {
    return this.http.get<ReporteEspecialidadDTO[]>(`${this.url}/especialidades-simple`);
  }

  listarReporteCentro(): Observable<ReporteCentroDTO[]> {
    return this.http.get<ReporteCentroDTO[]>(`${this.url}/centros-simple`);
  }
}
