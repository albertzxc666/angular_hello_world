import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { 
    path: 'products', 
    loadChildren: () => import('./modules/products/products.routes').then(r => r.PRODUCTS_ROUTES)
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./modules/cart/cart.routes').then(r => r.CART_ROUTES)
  },
  { 
    path: 'api-test', 
    loadComponent: () => import('./components/api-test/api-test.component').then(c => c.ApiTestComponent)
  },
  { path: '**', redirectTo: '/products' }
];
