import { Component, inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail-component',
  imports: [
    RouterModule, 
    CommonModule
  ],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public product: Product | undefined;
  public isLoading: boolean = false;
  public error: string | null = null;
  private id: number = 0;
  private subscription: Subscription = new Subscription();

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  public ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.id = +params['id']; // Преобразуем в число
        this.loadProduct();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadProduct(): void {
    this.isLoading = true;
    this.error = null;
    this.product = undefined;
    this.cdr.detectChanges();
    
    this.subscription.add(
      this.productService.getProductById(this.id).subscribe({
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
      })
    );
  }
}
