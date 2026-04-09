import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { Footer1Component } from '../../components/footer1/footer1';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { OngCardComponent } from '../../components/ongcard-component/ongcard-component';

import { OngCard } from '../../models/ong-card.model';

interface contatoForm {
  nome: FormControl;
  telefone: FormControl;
  email: FormControl;
  mensagem: FormControl;
}

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    NavbarComponent,
    Footer1Component,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    OngCardComponent,
    CommonModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  contatoForm!: FormGroup<contatoForm>;

  listaOngs: OngCard[] = [
    {
      id: 1,
      nomeOng: 'Anjos da Rua',
      causa: 'Causa Animal',
      verificada: true,
      imagemCapa: '',
      avatarUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=100&auto=format&fit=crop',
      destaque: true,
      voluntariosCount: '120+',
      doacaoPercent: '80',
      tituloCampanha: 'Mutirão de Sábado: Preparação',
      descricao: 'Junte-se a nós neste sábado para o grande mutirão de castração. Precisamos de voluntários para ajudar na organização e cuidados pós-operatórios.',
      categoriaTag: 'Animal',
      localizacao: 'Maceió'
    }
  ];

  constructor(private router: Router) {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensagem: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      console.log('Formulário de contato enviado:', this.contatoForm.value);
      this.contatoForm.reset();
    }
  }

  processarCliqueAjudar(ongId: number) {
    console.log(`O usuário clicou para ajudar a ONG com ID: ${ongId}`);
  }
}
