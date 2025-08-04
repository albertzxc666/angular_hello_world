import { Routes } from '@angular/router';
import { ProductListComponent } from './components/productList/product-list-component';
import { ProductDetailComponent } from './components/productDetail/product-detail-component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent }
];
