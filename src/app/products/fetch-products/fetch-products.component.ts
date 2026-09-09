import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-fetch-products',
  imports: [RouterLink],
  templateUrl: './fetch-products.component.html',
  styleUrl: './fetch-products.component.css'
})

export class FetchProductsComponent {

  private productService = inject(ProductService);
  public authService = inject(AuthService);
  productResource = this.productService.productResource;

}
