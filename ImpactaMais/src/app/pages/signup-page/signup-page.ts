import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button-component/button-component';
import { InputComponent } from '../../components/input-component/input-component';
import { Footer1Component } from '../../components/footer1/footer1';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import Swal from 'sweetalert2';

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
  isSubmitting = false;

  router = inject(Router);
  auth = inject(AuthService);

  signupForm!: FormGroup<SignupFormModel>;

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
    if (this.isSubmitting) return;

    if (this.signupForm.valid) {
      this.isSubmitting = true;
      
      const { nome, email, senha, termos } = this.signupForm.value;
      const payload = { 
        username: nome, 
        email: email, 
        senha: senha,
        termosAceitos: termos 
      };

      Swal.fire({
        title: 'Enviando...',
        text: 'Aguarde enquanto criamos sua conta.',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      this.auth.cadastrarUsuario(payload).subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          Swal.close();
          this.abrirModalDeConfirmacao(email!);
        },
        error: (erro: any) => {
          this.isSubmitting = false;
          console.error('O VERDADEIRO ERRO É:', erro);
          
          let mensagemReal = 'Houve um erro de comunicação com o servidor.';
          
          if (typeof erro.error === 'string') {
            mensagemReal = erro.error;
          } else if (erro.error && erro.error.message) {
            mensagemReal = erro.error.message;
          } else if (erro.message) {
             mensagemReal = erro.message;
          }

          Swal.fire('Ops!', mensagemReal, 'error');
        }
      });

    } else {
      
      this.signupForm.markAllAsTouched();

      if (this.signupForm.get('termos')?.invalid) {
        Swal.fire({
          title: 'Atenção!',
          text: 'Você precisa aceitar a Política de Privacidade para criar uma conta.',
          icon: 'warning',
          confirmButtonText: 'Entendi'
        });
      } else {
        Swal.fire({
          title: 'Campos Incompletos',
          text: 'Por favor, preencha todos os campos obrigatórios corretamente.',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  abrirModalDeConfirmacao(email: string) {
    Swal.fire({
      title: 'Verifique seu e-mail!',
      text: `Enviamos um código de 6 dígitos para ${email}`,
      input: 'text',
      inputPlaceholder: 'Digite o código aqui',
      inputAttributes: {
        maxlength: '6',
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Validar Conta',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (codigo) => {
        if (!codigo || codigo.length !== 6) {
          Swal.showValidationMessage('Por favor, insira um código válido de 6 dígitos');
          return false;
        }
        
        return new Promise((resolve, reject) => {
          this.auth.validarCodigoRegistro({ email: email, codigo: codigo }).subscribe({
            next: (res) => resolve(res),
            error: (err) => {
              Swal.showValidationMessage('Código incorreto ou expirado.');
              resolve(false);
            }
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sua conta foi ativada. Você já pode fazer login.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}