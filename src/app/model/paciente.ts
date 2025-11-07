// Modelo Paciente usado en frontend (coincide con PacienteDTO del backend)
export interface Paciente {
  idPaciente?: number;
  nombres: string;
  apellidos: string;
  dni: string;                 // 8 dígitos
  fechaNacimiento: string;     // ISO yyyy-MM-dd
  sexo: string;                // 'M' | 'F' | 'O'
  direccion?: string;
  telefono?: string;
  email?: string;
  tipoSangre?: string;
  alergias?: string;
  antecedentes?: string;
}
