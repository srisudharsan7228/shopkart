import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-actions',
  standalone: true,
  template: `
    <button type="button" (click)="addToCart()">
      Add {{ productName }} to cart
    </button>
  `
})
export class ProductActionsComponent {
  @Input() productName = '';
  @Output() added = new EventEmitter<string>();

  addToCart(): void {
    this.added.emit(`${this.productName} added from child Output event`);
  }
}
