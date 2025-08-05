import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ arrayName: 'subscriptions' })
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
  subscriptions: any[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.cdr.detectChanges();
    
    this.productService.getAllProducts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при загрузке товаров';
          this.isLoading = false;
          console.error('Error loading products:', error);
          this.cdr.detectChanges();
        }
      });
  }
}
