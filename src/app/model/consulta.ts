export interface Diagnostico {
  idDiagnostico?: number;
  descripcion: string;
  codigoCIE10: string;
  idConsulta?: number;
}


export interface RecetaMedicamento {
  idMedicamento: number;
  indicaciones: string;
  idReceta?: number;
}


export interface Receta {
  idReceta?: number;
  fechaEmision: string;
  idConsulta?: number;
  recetaMedicamentos: RecetaMedicamento[];
}


export interface Consulta {
  idConsulta?: number;
  idPaciente: number;
  idProfesional: number;
  idCentroMedico: number;
  fechaConsulta: string;
  diagnosticos: Diagnostico[];
  recetas: Receta[];
}
