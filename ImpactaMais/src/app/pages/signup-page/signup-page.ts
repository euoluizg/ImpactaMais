import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button-component/button-component';
import { InputComponent } from '../../components/input-component/input-component';
import { Footer1Component } from '../../components/footer1/footer1';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export function senhasIguaisValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmSenha = control.get('confirmSenha')?.value;

    if (!senha || !confirmSenha) {
      return null;
    }
    if (senha !== confirmSenha) {
      return { senhasDiferentes: true }; 
    }
    return null;
  };
}

interface SignupFormModel {
  nome: FormControl;
  email: FormControl;
  senha: FormControl;
  confirmSenha: FormControl;
  termos: FormControl;
}
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    Footer1Component,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss',
})
export class SignupPage {
  router = inject(Router);
  signupForm! : FormGroup<SignupFormModel>;

  constructor() {
    this.signupForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmSenha: new FormControl('', [Validators.required]),
      termos: new FormControl(false, [Validators.requiredTrue]),
    },
    { 
      validators: senhasIguaisValidator() 
    });
  }

  onSignUp() {
    if (this.signupForm.valid) {
      // Lógica de cadastro aqui
      console.log('Cadastro bem-sucedido!');
    } else {
      console.log('Formulário inválido. Por favor, preencha corretamente.');
      this.signupForm.markAllAsTouched();
    }
  }
}
