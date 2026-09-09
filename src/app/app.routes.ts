import { Routes } from '@angular/router';
import { adminGuard } from './auth/admin-guard';


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
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(
            (m) => m.LoginComponent
        )
    },

    {
        path: 'unauthorized',
        loadComponent: () => import('./auth/unauthorized/unauthorized.component').then(
            (m) => m.UnauthorizedComponent
        )
    },

    {
        path: 'products/add',
        canActivate: [adminGuard],
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


