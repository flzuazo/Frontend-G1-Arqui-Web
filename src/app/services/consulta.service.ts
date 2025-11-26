import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Consulta} from '../model/consulta';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private apiUrl =  environment.apiURL;

  constructor(private http: HttpClient) {}

  registrarConsulta(dto: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/nueva_consulta`, dto);
  }

}
