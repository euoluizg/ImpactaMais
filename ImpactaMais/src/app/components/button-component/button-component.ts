import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-component',
  standalone: true,
  imports: [],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() backgroundColor: string = '#12678d';
  @Input() textColor: string = '#ffffff';
  @Input() fontSize: string = '16px';
  @Input() borderRadius: string = '4px';
  @Input() width: string = 'auto';
  @Input() padding: string = '12px 24px';
  @Input() fontWeight: string = '700';
  @Input() border: string = 'none';

  @Output() action = new EventEmitter<void>();
}
