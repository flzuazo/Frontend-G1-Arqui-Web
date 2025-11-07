export interface PacienteHistorialDTO {
  antecedentes: string;
  alergias: string;
}

export interface PacienteHistorialResponse {
  id?: number;           // por si el backend lo devuelve
  antecedentes?: string;
  alergias?: string;
  fechaUltimaActualizacion?: string;
}
// item para la tabla de mantenimiento
export interface PacienteHistorialItem {
  registroId: number;         // id del registro de historial
  fecha: string;              // ISO o legible
  antecedentes: string;
  alergias: string;
  fechaUltimaActualizacion?: string;
}

