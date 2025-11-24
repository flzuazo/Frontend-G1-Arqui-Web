import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  constructor(private router: Router) {}
   goMenu() {
    console.log('navegando a /menu');      // mira la consola
    this.router.navigate(['/menu'])
      .then(ok => console.log('navegación ok:', ok))
      .catch(err => console.error('error navegación:', err));
  }
  
  logout() {
    localStorage.clear(); // Limpia sesión o token
    this.router.navigate(['/login']);
  }

}
