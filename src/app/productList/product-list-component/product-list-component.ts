import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }

  public async loadProducts(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    this.cdr.detectChanges();
    
    try {
      this.products = await this.productService.getAllProducts();
    } catch (error) {
      this.error = 'Ошибка при загрузке товаров';
      console.error('Error loading products:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
