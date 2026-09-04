import { Routes } from '@angular/router';


export const routes: Routes = [

    {
        path: "",
        redirectTo: 'products',
        pathMatch: 'full'
    },

    {
        path: "products",
        loadComponent: () => import('./products/fetch-products/fetch-products.component').then(
            (m) => m.FetchProductsComponent
        )
    },

    {
        path: 'products/add',
        loadComponent: () => import('./products/add-product/add-product.component').then(
            (m) => m.AddProductComponent
        )
    },

    {
        path: 'products/:id',
        loadComponent: () => import('./products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent
        )
    }
];


