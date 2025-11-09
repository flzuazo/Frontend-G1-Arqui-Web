export interface ProfesionalSaludDTO {
  idProfesional?: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  colegiatura: string;
  telefono: string;
  email: string;   // en el form lo llamaremos "correo" y lo mapeamos aquí
}
