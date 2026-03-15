import { Component, Input,  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "textarea";

@Component({
  selector: 'InputComponent',
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
  onChage: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event){
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChage(newValue);
  }

  writeValue(value: any): void {
      this.value = value || '';
  }

  registerOnChange(fn: any): void {
      this.onChage = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }
}
