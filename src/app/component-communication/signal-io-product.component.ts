import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-signal-product',
  standalone: true,
  template: `
    <p class="line">
      Signal input product: <strong>{{ productName() }}</strong>
      <span class="badge">Price: INR {{ price() }}</span>
    </p>

    <button type="button" (click)="addToCart()">Add with signal output</button>
  `,
  styles: [
    `
    .line {
      margin: 0;
    }

    .badge {
      margin-left: 8px;
      padding: 4px 8px;
      border-radius: 999px;
      background: #e9f8f0;
      border: 1px solid #9fd8b9;
      font-size: 12px;
    }
    `
  ]
})
export class SignalIoProductComponent {
  productName = input('');
  price = input(0);

  added = output<string>();

  addToCart(): void {
    this.added.emit(`${this.productName()} added from signal output`);
  }
}