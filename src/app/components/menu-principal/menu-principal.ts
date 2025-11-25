import { Component,OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [RouterModule,CommonModule,],
  templateUrl: './menu-principal.html',
  styleUrls: ['./menu-principal.css'],
})
export class MenuPrincipal implements OnInit {

rol: string | null = 'rol';

ngOnInit(): void{
  this.rol = localStorage.getItem('rol');
  console.log('Rol en menú principal:', this.rol);
}


get esAdmin(): boolean {
  return this.rol === 'ROLE_ADMIN';
}

get esProfesional(): boolean {
  return this.rol === 'ROLE_PROFESIONALSALUD';
}

get esPaciente(): boolean {
  return this.rol === 'ROLE_PACIENTE';
}

}
