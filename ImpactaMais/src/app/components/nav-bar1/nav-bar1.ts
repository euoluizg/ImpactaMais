import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'navBar1Component',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './nav-bar1.html',
  styleUrl: './nav-bar1.scss',
})
export class NavBar1Component {
  router = inject(Router);
}
