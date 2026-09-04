import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  template: `
    <div class="stepper">
      <button type="button" (click)="decrease()">-</button>
      <span>Quantity: {{ quantity }}</span>
      <button type="button" (click)="increase()">+</button>
    </div>
  `,
  styles: [
    `
    .stepper {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    `
  ]
})
export class QuantityStepperComponent {
  @Input() quantity = 1;
  @Output() quantityChange = new EventEmitter<number>();

  increase(): void {
    this.quantityChange.emit(this.quantity + 1);
  }

  decrease(): void {
    this.quantityChange.emit(Math.max(1, this.quantity - 1));
  }
}
