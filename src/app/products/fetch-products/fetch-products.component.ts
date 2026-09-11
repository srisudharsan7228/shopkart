import { Component, inject, signal, HostListener } from '@angular/core';
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
  //productResource = this.productService.productResource;
  searchText = signal("");

  productResource = this.productService.searchProductResource({searchText: this.searchText});

  OnSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const triggerPosition = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= triggerPosition) {
      console.log("bottom reached");
    }
}
  
}
