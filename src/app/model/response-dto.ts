export class ResponseDto {
  jwt: string;
  roles: string[];
  idPaciente?: number | null;
  idProfesional?: number | null;
}
