import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { OngCard } from '../../models/ong-card.model';
import { IconComponent } from '../icon-component/icon-component';

@Component({
  selector: 'ongcard-component',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    IconComponent
  ],
  templateUrl: './ongcard-component.html',
  styleUrl: './ongcard-component.scss',
})
export class OngCardComponent {
  @Input() data! : OngCard;
  @Output() onAjudar = new EventEmitter<number>();

  getIconeCategoria(categoria: string): string {
    const icones: { [key: string]: string } = {
      'Animal': '🐾',
      'Meio Ambiente': '🌳',
      'Educação': '📚',
      'Saúde': '🏥',
      'Social': '🤝',
      'Alimentação': '🍲',
      'Crianças': '🧸'
    };
    return icones[categoria] || '📍';
  }

  clicouAjudar() {
    this.onAjudar.emit(this.data.id);
  }
}
