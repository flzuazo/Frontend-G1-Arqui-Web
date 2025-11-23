import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Router necesario para redirigir al login
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-principal.html',
  styleUrls: ['./menu-principal.css'],
})

export class MenuPrincipalComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  cerrarSesion() {
    // Llama al servicio para limpiar el token/usuario
    this.loginService.logout();

    // Redirige al usuario a la pantalla de Login
    this.router.navigate(['/login']);
  }
}
