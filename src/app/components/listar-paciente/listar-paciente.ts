import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { ApiService } from '../../services/api';
import {Paciente} from '../../model/paciente';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {PacienteDetalleDialog} from './paciente-detalle-dialog/paciente-detalle-dialog';
import {MatLabel} from '@angular/material/form-field';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-listar-paciente',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatLabel,
    MatFormField,
    MatInput
  ],
  templateUrl: './listar-paciente.html',
  styleUrl: './listar-paciente.css',
})
export class ListarPaciente implements OnInit {
  displayedColumns: string[] = [
    'idPaciente',
    'nombres',
    'apellidos',
    'dni',
    'telefono',
    'email',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Paciente>();

  constructor(private pacienteService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Cargar lista de pacientes
    this.pacienteService.listarPacientes().subscribe(data => {
      // Ordenar por ID ascendente
      const pacientesOrdenados = data.sort(
        (a, b) => (a.idPaciente ?? 0) - (b.idPaciente ?? 0)
      );

      this.dataSource.data = pacientesOrdenados;

      // Filtro SOLO por DNI
      this.dataSource.filterPredicate = (paciente: Paciente, filter: string) =>
        paciente.dni?.toLowerCase().includes(filter);
    });
  }
  verDetalle(paciente: Paciente) {
    this.dialog.open(PacienteDetalleDialog, {
      width: '420px',
      data: paciente
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
