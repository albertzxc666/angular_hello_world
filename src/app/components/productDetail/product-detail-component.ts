import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/CartItem.model';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CategoryTranslatePipe } from '../../pipes/category-translate.pipe';
import { DescriptionTranslatePipe } from '../../pipes/description-translate.pipe';
import { CurrencyConvertPipe } from '../../pipes/currency-convert.pipe';
import * as CartActions from '../../store/cart/cart.actions';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-product-detail-component',
  imports: [
    RouterModule, 
    CommonModule,
    TranslatePipe,
    CategoryTranslatePipe,
    DescriptionTranslatePipe,
    CurrencyConvertPipe
  ],
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductDetailComponent implements OnInit {

  public product: Product | undefined;
  public isLoading: boolean = false;
  public isDeleting: boolean = false;
  public error: string | null = null;
  private id: string = '';
  public subscriptions: any[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly store = inject(Store);
  private readonly languageService = inject(LanguageService);

  public ngOnInit() {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        const idParam = params['id'];
        this.id = idParam; // Используем ID как есть (строка или число)
        
        this.loadProduct();
      });
  }

  public loadProduct(): void {
    this.isLoading = true;
    this.error = null;
    this.product = undefined;
    
    this.productService.getProductById(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (product) => {
          this.product = product;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при загрузке товара';
          this.isLoading = false;
          console.error('Error loading product:', error);
        }
      });
  }

  public onDeleteProduct(): void {
    if (!this.product) return;
    
    const confirmMessage = this.languageService.translate('product.deleteConfirm', { title: this.product.title });
    if (!confirm(confirmMessage)) {
      return;
    }

    this.isDeleting = true;
    this.error = null;

    this.productService.deleteProduct(this.product.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          console.log('Товар удален:', this.product?.title);
          this.isDeleting = false;
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при удалении товара';
          this.isDeleting = false;
          console.error('Ошибка удаления товара:', error);
        }
      });
  }

  /**
   * Обработка ошибки загрузки изображения
   */
  public onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
     // Используем существующее изображение как заглушку
  }

  /**
   * Обработка успешной загрузки изображения
   */
  public onAddToCart(): void {
    if (!this.product) return;
    
    const cartItem: CartItem = {
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      image: this.product.image,
      quantity: 1
    };
    
    this.store.dispatch(CartActions.addToCart({ item: cartItem }));
    const message = this.languageService.translate('product.addedToCart');
    alert(message);
  }
  public onImageLoad(event: Event): void {
    // Изображение загружено успешно
  }
}
