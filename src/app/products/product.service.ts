import { Injectable, resource, Signal } from '@angular/core';

import { Product, ProductApiResponse } from './product.model';

@Injectable({ providedIn: 'root' })

export class ProductService {

    readonly productResource = resource<Product[], void>({
        defaultValue: [],
        loader: () => this.fetchProducts()
    });

    productDetailResource({ productId }: { productId: Signal<number | null>; }) {
        return resource<Product | null, { productId: number } | undefined>({
            defaultValue: null,
            params: () => {
                const id = productId();
                return id === null ? undefined : { productId: id };
            },
            loader: async ({ params }) => {
                if (!params) {
                    return null;
                }

                return this.fetchProduct(params.productId);
            }
        });
    }

    private async fetchProducts() {
        const response = await fetch('https://jsonexamples.com/products?limit=12');
        const data = (await response.json()) as ProductApiResponse;
        return data.products;
    }

    private async fetchProduct(productId: number) {
        const response = await fetch(`https://jsonexamples.com/products/${productId}`);
        return (await response.json()) as Product;
    }
}