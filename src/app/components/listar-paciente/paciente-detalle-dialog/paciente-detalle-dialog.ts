import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Paciente} from '../../../model/paciente';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-paciente-detalle-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIcon,
    MatButton,
    MatDivider
  ],
  templateUrl: './paciente-detalle-dialog.html',
  styleUrl: './paciente-detalle-dialog.css',
})
export class PacienteDetalleDialog {
  constructor(
    public dialogRef: MatDialogRef<PacienteDetalleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
