import { Routes } from '@angular/router';
import { ProductListComponent } from './components/productList/product-list-component';
import { ProductDetailComponent } from './components/productDetail/product-detail-component';
import { ProductFormComponent } from './components/productForm/product-form-component';
import { CartPageComponent } from './components/cartPage/cart-page-component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartPageComponent }
];
