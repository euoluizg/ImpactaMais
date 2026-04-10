import { Component, inject } from '@angular/core';
import { CheckboxComponent } from '../../components/checkbox-component/checkbox-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { InputComponent } from '../../components/input-component/input-component';
import { Footer1Component } from '../../components/footer1/footer1';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

export function senhasIguaisValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Pega os valores dos dois campos
    const senha = control.get('senha')?.value;
    const confirmSenha = control.get('confirmSenha')?.value;

    // Se algum dos campos estiver vazio, não faz a validação de erro ainda
    if (!senha || !confirmSenha) {
      return null;
    }

    // Se forem diferentes, retorna um objeto de erro customizado
    if (senha !== confirmSenha) {
      return { senhasDiferentes: true }; 
    }

    // Se forem iguais, retorna null (significa que está tudo válido!)
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
    ButtonComponent,
    CheckboxComponent
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
      termos: new FormControl(true, [Validators.requiredTrue]),
    },
    { 
      validators: senhasIguaisValidator() 
    });
  }

  onSignUp() {
    // 1. Printando APENAS a senha (para o seu teste)
    console.log('Senha digitada:', this.signupForm.get('senha')?.value);

    // 2. Printando TODOS os dados do formulário de uma vez (Super útil!)
    console.log('Valores do Form:', this.signupForm.value);

    if (this.signupForm.valid) {
      // Lógica de cadastro aqui
      console.log('Cadastro bem-sucedido!');
    } else {
      console.log('Formulário inválido. Por favor, preencha corretamente.');
      this.signupForm.markAllAsTouched();
    }
  }
}
