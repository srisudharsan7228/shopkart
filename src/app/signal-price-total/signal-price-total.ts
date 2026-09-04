import { Component, signal, computed, effect, input } from '@angular/core';

@Component({
  standalone:true,
  imports: [],
  selector: 'app-signal-price-total',
  styleUrl: './signal-price-total.css',
  templateUrl: './signal-price-total.html',
})
export class SignalPriceTotal {

  readonly selectedPrice = input(0);
  readonly price = signal(0);
  readonly quantity = signal(1);
  readonly totalPrice = computed(() => this.price() * this.quantity() );

  effectMessage = "";

  constructor() {

    effect(() => {
      this.price.set(this.selectedPrice());
    }) 

    effect(() => {
      const currentPrice = this.price();
      const currentQunatity = this.quantity();
      const currentTotal = this.totalPrice();

      this.effectMessage = `Effect price ${currentPrice}, quantity ${currentQunatity}, totalprice ${currentTotal}`;
    })
  }

  onPriceInput(event:Event):void {
    const value = Number((event.target as HTMLInputElement).value);
    this.price.set(value ?? 0);
  }

  onQuantityInput(event:Event):void {
    const value = Number((event.target as HTMLInputElement).value);
    this.quantity.set(Math.max(1, value ?? 0));
  }

  incrementQuantity():void {
    this.quantity.update((value) => value + 1);
  }

  decrementQuantity():void {
    this.quantity.update((value) => Math.max(1, value - 1));
  }

}
