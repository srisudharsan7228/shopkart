import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) }
  );

  readonly productResource = this.productService.productDetailResource({ productId: this.productId });

  readonly galleryImages = computed(() => {
    const product = this.productResource.value();

    if (!product) {
      return [];
    }

    return product.images?.length ? product.images : [product.thumbnail];
  });

}