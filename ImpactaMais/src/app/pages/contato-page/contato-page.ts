import { Component } from '@angular/core';
import { NavBar1Component } from '../../components/nav-bar1/nav-bar1';
import { Footer1Component } from "../../components/footer1/footer1";
import { InputComponent } from '../../components/input-component/input-component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface contatoForm{
    nome: FormControl,
    telefone: FormControl;
    email: FormControl;
    mensagem: FormControl;
}

@Component({
  selector: 'app-contato-page',
  standalone: true,
  imports: [
    NavBar1Component,
    Footer1Component,
    InputComponent,
    ReactiveFormsModule
],
  providers: [],
  templateUrl: './contato-page.html',
  styleUrl: './contato-page.scss',
})
export class ContatoPage {
  contatoForm!: FormGroup<contatoForm>;

  constructor(
    private router: Router,
  ){
    this.contatoForm = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        mensagem: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
  }
}
