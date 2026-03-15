import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBar1Component } from "../../components/nav-bar1/nav-bar1";
import { Footer1Component } from "../../components/footer1/footer1";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavBar1Component,
    Footer1Component
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

}
