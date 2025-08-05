import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-product-detail-component',
  imports: [
    RouterModule, 
    CommonModule
  ],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent implements OnInit {

  public product: Product | undefined;
  public isLoading: boolean = false;
  public error: string | null = null;
  private id: number = 0;
  subscriptions: any[] = [];

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  public ngOnInit() {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.id = +params['id']; // Преобразуем в число
        this.loadProduct();
      });
  }

  public loadProduct(): void {
    this.isLoading = true;
    this.error = null;
    this.product = undefined;
    this.cdr.detectChanges();
    
    this.productService.getProductById(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при загрузке товара';
          this.isLoading = false;
          console.error('Error loading product:', error);
          this.cdr.detectChanges();
        }
      });
  }
}
