import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, Signal } from '@angular/core';
import type { CreateProductRequest } from './product.model';
import { Product, ProductApiResponse } from './product.model';
import { debounceTime, firstValueFrom, of, switchMap, map, distinctUntilChanged } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })

export class ProductService {
    private http = inject(HttpClient);

    // readonly productResource = resource<Product[], void>({
    //     defaultValue: [],
    //     loader: () => this.fetchProducts()
    // });

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

    searchProductResource({ searchText, skip }: { searchText: Signal<string>; skip: Signal<number>; }) {
        return rxResource<{ products: Product[]; total: number }, { searchText: string; skip: number }>({
            defaultValue: { products: [], total: 0 },
            params: () => ({
                searchText: searchText(),
                skip: skip()
            }),
            stream: ({ params }) =>
                of(params).pipe(
                    debounceTime(1000),
                    distinctUntilChanged((previous, current) => (
                        previous.searchText === current.searchText && previous.skip === current.skip
                    )),
                    switchMap(({ searchText: currentSearchText, skip: currentSkip }) => {
                        const query = currentSearchText.trim();
                        const baseEndpoint = query
                            ? `https://jsonexamples.com/products/search?q=${encodeURIComponent(query)}`
                            : 'https://jsonexamples.com/products';
                        const endpoint = `${baseEndpoint}${query ? '&' : '?'}limit=12&skip=${currentSkip}`;
                        return this.http
                            .get<ProductApiResponse>(endpoint)
                            .pipe(map((response) => ({
                                products: response.products,
                                total: response.total ?? response.products.length
                            })));
                    })
                )
        });
    }

    addProduct({ payload }: { payload: Signal<CreateProductRequest | null>; }) {
        return resource<unknown | null, CreateProductRequest | undefined>({
            defaultValue: null,
            params: () => payload() ?? undefined,
            loader: async ({ params }) => {
                if (!params) {
                    return null;
                }
                return firstValueFrom(this.http.post<unknown>('https://jsonexamples.com/products/add', params));
            }
        });
    }

    // private async fetchProducts() {
    //     const data = await firstValueFrom(
    //         this.http.get<ProductApiResponse>('https://jsonexamples.com/products?limit=12')
    //     );
    //     return data.products;
    // }

    private async fetchProduct(productId: number) {
        return firstValueFrom(this.http.get<Product>(`https://jsonexamples.com/products/${productId}`));
    }
}