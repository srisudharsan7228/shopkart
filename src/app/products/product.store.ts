import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from './product.model';

interface ProductState {
    products: Product[];
    total: number;
    loading: boolean;
    error: string | null;
}

export const ProductStore = signalStore(

 { providedIn : 'root'},

 withState<ProductState>({
    products: [],
    total: 0,
    loading: false,
    error: null
 }),

 withComputed((store) => ({
    hasMore: computed(() => store.products().length < store.total())
 })),

 withMethods((store) => ({
    setProductsPage(page: Product[], total: number, replace: boolean): void {
        patchState(store, (state) => ({
            products: replace ? page : [...state.products, ...page],
            total,
            error: null
        }))
    },

    resetList(): void {
        patchState(store, {
            products: [],
            total: 0,
            error: null
        });
    },

    setLoading(loading: boolean): void {
        patchState(store, {loading});
    },

    setError(error: string | null): void {
        patchState(store, {error, loading: false})
    },

 }))

)