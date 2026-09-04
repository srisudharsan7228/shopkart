import { Component } from '@angular/core';
import { InStockDirective } from '../directives/in-stock.directive';
import { DiscountPricePipe } from '../pipes/discount-price-pipe';
import { SignalPriceTotal } from '../signal-price-total/signal-price-total';

interface Product {
  name: string;
  price: number;
  description: string;
  discount: string;
  stock: number;
}

@Component({
  standalone: true,
  selector: 'app-sample-task',
  styleUrls: ['./sample-task.css'],
  templateUrl: './sample-task.html',
  imports: [InStockDirective, DiscountPricePipe, SignalPriceTotal]
})

export class SampleTask {

  public selectedProduct : Product | null = null;
  public products: Product[] = [
    {
      name: 'Laptop',
      price: 50000,
      description: 'Good for coding and daily work.',
      discount: '50%',
      stock: 10
    },
    {
      name: 'Phone',
      price: 10000,
      description: 'Useful for calls, apps, and internet.',
      discount: '5%',
      stock: 10
    },
    {
      name: 'Headphones',
      price: 3000,
      description: 'Helpful for music and online classes.',
      discount: '15%',
      stock: 10
    },
  ];

  showProduct(product: Product) {
    this.selectedProduct = product;
  }
}
 