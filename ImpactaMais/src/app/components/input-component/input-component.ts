import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input,  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'InputComponent',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() backgroundColor: string = '#ffffff';
  @Input() textColor: string = '#000000';
  @Input() fontSize: string = '16px';
  @Input() borderRadius: string = '4px';
  @Input() width: string = '100%';
  @Input() type: string = 'text';

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  updateValue(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
