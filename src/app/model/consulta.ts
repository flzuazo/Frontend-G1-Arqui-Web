export interface Consulta {
  idConsulta?: number;
  idPaciente: number;
  idProfesional: number;
  idCentroMedico: number;
  fechaConsulta: string; // YYYY-MM-DD
  diagnostico?: string;
  receta?: string;
}
