export class Consulta {
  idConsulta?: number;
  idPaciente!: number;
  idProfesional!: number;
  idCentroMedico!: number;
  fechaConsulta?: Date | null;
  //diagnosticos: Diagnostico[] = [];
  //ecetas: Receta[] = [];

  constructor(init?: Partial<Consulta>) {
    if (init) {
      Object.assign(this, init);
      if (init.fechaConsulta) {
        this.fechaConsulta =
          init.fechaConsulta instanceof Date
            ? init.fechaConsulta
            : new Date(init.fechaConsulta as any);
      }
    }
  }
}
