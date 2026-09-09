import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);
  protected readonly title = signal('my-first-app');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
