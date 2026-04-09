import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

@Component({
  selector: 'icon',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <iconify-icon [attr.icon]="name" [attr.width]="size" [attr.height]="size" [style.color]="color"></iconify-icon>
  `,
})
export class IconComponent {
  @Input() name!: string;
  @Input() size: string = '24';
  @Input() color: string = 'currentColor';
}
