import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private apiUrl = environment.apiURL + '/pacientes';

  constructor(private http: HttpClient) {}

  // HU10: PUT /api/actualizar_paciente/{id}
  actualizarPaciente(id: number, data: any) {
    const url = environment.apiURL + `/actualizar_paciente/${id}`;
    return this.http.put(url, data);
  }


  obtenerPaciente(id: number) {
    const url = this.apiUrl + `/${id}`;
    return this.http.get<any>(url);
  }
}
