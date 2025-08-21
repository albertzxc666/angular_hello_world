import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/Product.model';
import { ProductService } from '../../services/product.service';
import { VALIDATION_PATTERNS } from '../../consts/patterns.const';
import { ERROR_MESSAGES } from '../../consts/error.const';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form-component.html',
  styleUrls: ['./product-form-component.scss']
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  public productForm!: FormGroup;
  public isEditMode = false;
  public productId: string | null = null;
  public isLoading = false;
  public error: string | null = null;
  
  // Константы для использования в шаблоне
  public readonly ERROR_MESSAGES = ERROR_MESSAGES;

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
    
    // Для тестирования - предзаполняем форму в режиме создания
    if (!this.isEditMode) {
      this.productForm.patchValue({
        title: 'Тестовый товар',
        price: 999.99,
        description: 'Описание тестового товара для демонстрации работы формы',
        image: '/assets/img/mouse.webp',
        category: 'mouse'
      });
    }
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.PRODUCT_TITLE)]],
      price: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.PRICE)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      image: ['', [Validators.pattern(VALIDATION_PATTERNS.IMAGE_URL)]],
      category: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.CATEGORY_NAME)]]
    });
  }

            private checkEditMode(): void {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
              this.isEditMode = true;
              this.productId = id;
              this.loadProductData();
            }
          }

  private loadProductData(): void {
    if (!this.productId) return;
    
    this.isLoading = true;
    this.error = null;
    
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        // Проверяем и корректируем поле image если нужно
        const formData = { ...product };
        if (formData.image && !formData.image.startsWith('/assets/img/')) {
          formData.image = ''; // Очищаем поле если путь не локальный
        }
        
        this.productForm.patchValue(formData);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        console.error('Ошибка загрузки товара:', error);
      }
    });
  }

  public onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.error = null;
      
      const formData = this.productForm.value;
      
      if (this.isEditMode && this.productId) {
        // Редактирование существующего товара
        this.productService.updateProduct(this.productId, formData).subscribe({
          next: (updatedProduct) => {
            console.log('Товар обновлен:', updatedProduct);
            this.isLoading = false;
            this.router.navigate(['/products']);
          },
          error: (error) => {
            this.error = error.message;
            this.isLoading = false;
            console.error('Ошибка обновления товара:', error);
          }
        });
      } else {
        // Создание нового товара
                 this.productService.createProduct(formData).subscribe({
           next: (newProduct) => {
             console.log('Товар создан:', newProduct);
             this.isLoading = false;
             // Принудительно обновляем список товаров и перенаправляем
             this.router.navigate(['/products'], { queryParams: { refresh: Date.now() } });
           },
          error: (error) => {
            this.error = error.message;
            this.isLoading = false;
            console.error('Ошибка создания товара:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  public onReset(): void {
    this.productForm.reset();
  }

  public onCancel(): void {
    this.router.navigate(['/products']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  public getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }
      if (control.errors['minlength']) {
        return ERROR_MESSAGES.TEXT_TOO_SHORT + ': ' + control.errors['minlength'].requiredLength + ' символов';
      }
      if (control.errors['maxlength']) {
        return ERROR_MESSAGES.TEXT_TOO_LONG + ': ' + control.errors['maxlength'].requiredLength + ' символов';
      }
      if (control.errors['min']) {
        return ERROR_MESSAGES.INVALID_NUMBER + ': минимум ' + control.errors['min'].min;
      }
      if (control.errors['max']) {
        return ERROR_MESSAGES.INVALID_NUMBER + ': максимум ' + control.errors['max'].max;
      }
      if (control.errors['pattern']) {
        switch (controlName) {
          case 'title':
            return ERROR_MESSAGES.INVALID_TEXT + ': название товара';
          case 'price':
            return ERROR_MESSAGES.INVALID_PRICE;
          case 'image':
            return ERROR_MESSAGES.INVALID_URL + ': изображение';
          case 'category':
            return ERROR_MESSAGES.INVALID_NAME + ': категория';
          default:
            return ERROR_MESSAGES.VALIDATION_ERROR;
        }
      }
    }
    
    return '';
  }
} 