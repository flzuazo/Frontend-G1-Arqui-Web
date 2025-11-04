import {Consulta} from './consulta';

export class Paciente {
  idPaciente?: number;
  nombres?: string;
  apellidos?: string;
  dni!: string; // obligatorio, longitud esperada: 8
  fechaNacimiento?: Date | null;
  sexo?: string | null; // carácter, p. ej. 'M' | 'F'
  direccion?: string;
  telefono?: string;
  email?: string;
  tipoSangre?: string;
  alergias?: string;
  antecedentes?: string;
  consultas: Consulta[] = [];

  constructor(init?: Partial<Paciente>) {
    Object.assign(this, init);
    if (init?.fechaNacimiento) {
      this.fechaNacimiento =
        init.fechaNacimiento instanceof Date
          ? init.fechaNacimiento
          : new Date(init.fechaNacimiento as any);
    }
  }
}
