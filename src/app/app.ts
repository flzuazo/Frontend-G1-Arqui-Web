import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Frontend-G1-Arqui-Web');

  showNavbar = true;

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        const hideNavbarRoutes = ['/', '/login'];

        this.showNavbar = !hideNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }

  get hideFooter() {
    return this.router.url === '/' || this.router.url === '/menu';
  }
}
