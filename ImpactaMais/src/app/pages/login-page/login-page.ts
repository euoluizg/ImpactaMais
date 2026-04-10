import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer1Component } from "../../components/footer1/footer1";
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { Router, RouterModule } from '@angular/router';
import { CheckboxComponent } from '../../components/checkbox-component/checkbox-component';

interface LoginFormModel {
  email: FormControl;
  senha: FormControl;
  rememberMe: FormControl;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    Footer1Component,
    InputComponent,
    ButtonComponent,
    CheckboxComponent
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  router = inject(Router);

  loginForm! : FormGroup<LoginFormModel>;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl(false)
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Lógica de autenticação aqui
      console.log('Login bem-sucedido!');
    } else {
      console.log('Formulário inválido. Por favor, preencha corretamente.');
      this.loginForm.markAllAsTouched();
    }
  }

  goSignUp(){
    this.router.navigate(['/signup'])
  }
}
