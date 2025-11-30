export interface Paciente {
  idPaciente?: number;
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  sexo: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  tipoSangre?: string;
  alergias?: string;
  antecedentes?: string;
}
export interface PacienteUpdateDTO {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
  direccion?: string;
  telefono?: string;
  email?: string;
  alergias?: string;
}
