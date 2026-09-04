import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})

export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discount: string): number {
    const discountValue = Number (discount.replace("%", ""));
    return price - (price * discountValue) / 100;
  }
}
