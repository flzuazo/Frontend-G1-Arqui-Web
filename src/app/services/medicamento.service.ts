import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MedicamentoService {
  private apiUrl = environment.apiBaseUrl + '/medicamentos';

  constructor(private http: HttpClient) { }

  // HU14: POST /api/medicamentos
  registrar(medicamento: { nombre: string, dosis: string }) {
    return this.http.post(this.apiUrl, medicamento);
  }

  // HU15: GET /api/medicamentos
  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
