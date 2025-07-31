import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';

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

  public async loadProduct(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    this.product = undefined;
    this.cdr.detectChanges();
    
    try {
      this.product = await this.productService.getProductById(this.id);
      
      if (!this.product) {
        this.error = 'Товар не найден';
      }
    } catch (error) {
      this.error = 'Ошибка при загрузке товара';
      console.error('Error loading product:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
