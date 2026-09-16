import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface ProductPriceApiResponse {
  id: number;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class BeginnerPriceService {
  private http = inject(HttpClient);

  getDiscountedPrice(price: number, discountPercent: number): number {
    return price - (price * discountPercent) / 100;
  }

  getTaxAmount(price: number, taxPercent: number): number {
    return (price * taxPercent) / 100;
  }

  getFinalPrice(price: number, discountPercent: number, taxPercent: number): number {
    const discounted = this.getDiscountedPrice(price, discountPercent);
    const tax = this.getTaxAmount(discounted, taxPercent);

    return discounted + tax;
  }

  getProductPrice(productId: number): Observable<number> {
    return this.http
      .get<ProductPriceApiResponse>(`https://jsonexamples.com/products/${productId}`)
      .pipe(map((response) => response.price));
  }
}
