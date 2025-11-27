import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { RequestDto } from '../../model/request-dto';
import { ResponseDto } from '../../model/response-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, CommonModule],
})
export class Login {
  usuario: string = '';
  password: string = '';
  router: Router = inject(Router);
  loginService: LoginService = inject(LoginService);

  ngOnInit() {
    // Limpia el token anterior si lo hubiera
    if (localStorage.getItem('token')) {
      localStorage.clear();
      console.log('Token eliminado al iniciar login');
    }
  }

  login() {
    if (!this.usuario || !this.password) {
      alert('Por favor ingresa tus credenciales');
      return;
    }

    const request: RequestDto = {
      username: this.usuario,
      password: this.password,
    };

    console.log('Enviando credenciales:', request);

    this.loginService.login(request).subscribe({
      next: (data: ResponseDto) => {
        console.log('Login exitoso. Roles:', data.roles, 'id', data.idProfesional, 'id', data.idPaciente);
        localStorage.setItem('rol', data.roles[0]);
        localStorage.setItem('idPaciente', data.idPaciente?.toString() ?? '');
        localStorage.setItem('idProfesional', data.idProfesional?.toString()??'');
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        alert('Credenciales inválidas o error en el servidor');
      },
    });
  }
}
