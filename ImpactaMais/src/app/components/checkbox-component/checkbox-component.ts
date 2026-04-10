import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'checkbox-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-component.html',
  styleUrl: './checkbox-component.scss',
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() activeColor: string = '#12678D';
  @Input() size: string = '';
  @Input() active: boolean = false;
  @Output() change = new EventEmitter<boolean>();

  value: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  toggle() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // Métodos do CVA
  writeValue(val: boolean): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
