import { Component, Input,  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "textarea";

@Component({
  selector: 'InputComponent',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";

  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    let newValue = target.value;

    if (this.type === 'tel' || this.type === 'number') {
    newValue = newValue.replace(/\D/g, ''); 
    target.value = newValue; 
  }

    this.value = newValue;
    this.onChange(newValue);
  }

  writeValue(value: any): void {
      this.value = value || '';
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }
}
