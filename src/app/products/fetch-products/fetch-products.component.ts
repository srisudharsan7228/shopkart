import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import { ProductStore } from '../product.store';

@Component({
  standalone: true,
  selector: 'app-fetch-products',
  imports: [RouterLink],
  templateUrl: './fetch-products.component.html',
  styleUrl: './fetch-products.component.css'
})
export class FetchProductsComponent {
  private productService = inject(ProductService);
  private productStore = inject(ProductStore);
  public authService = inject(AuthService);
 
  searchText = signal('');
  skip = signal(0);
  products = this.productStore.products;
  isLoadMore = this.productStore.hasMore;
  pageSize = 12;

  private isNextPageLocked = false;
  private lastProcessedPageRequestKey = '';

  productResource = this.productService.searchProductResource({
    searchText: this.searchText,
    skip: this.skip
  });

  constructor() {
    effect(() => {
      if (!this.productResource.isLoading()) {
        this.isNextPageLocked = false;
      }
    });

    effect(() => {
      const isLoading = this.productResource.isLoading();
      const hasError = !!this.productResource.error();
      const pageResponse = this.productResource.value();
      const page = pageResponse.products;
      const currentSkip = this.skip();
      const pageRequestKey = `[${this.searchText().trim()}|${currentSkip}]`;

      if (isLoading || hasError || this.lastProcessedPageRequestKey === pageRequestKey) {
        return;
      }
      this.productStore.setProductsPage(page, pageResponse.total, false);

      this.lastProcessedPageRequestKey = pageRequestKey;
    });
  }

  OnSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText.set(value);
    this.skip.set(0);
    this.productStore.resetList();
    this.lastProcessedPageRequestKey = '';
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const triggerPosition = document.documentElement.scrollHeight - 200;

    if (scrollPosition >= triggerPosition) {
      this.loadNextProducts();
    }
  }

  loadNextProducts() {
    if (!this.isLoadMore() || this.isNextPageLocked || this.productResource.isLoading()) {
      return;
    }

    this.isNextPageLocked = true;
    this.skip.update((currentSkip) => currentSkip + this.pageSize);
  }

  reloadProducts() {
    this.skip.set(0);
    this.productStore.resetList();
    this.lastProcessedPageRequestKey = '';
    this.productResource.reload();
  }
}