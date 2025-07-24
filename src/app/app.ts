import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header-component/header-component';
import { GreetingComponent } from './greeting/greeting-component/greeting-component';
import { ProductDetailComponent } from './productDetail/product-detail-component/product-detail-component';
import { ProductListComponent } from './productList/product-list-component/product-list-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GreetingComponent, ProductDetailComponent, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hello-world');
}
