import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'navbar-component',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    ButtonComponent
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {
  router = inject(Router);

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
