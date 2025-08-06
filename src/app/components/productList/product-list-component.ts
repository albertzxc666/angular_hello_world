import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map, startWith } from 'rxjs/operators';
import { errorDownload } from '../../consts/main.const';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-product-list-component',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = false;
  isSearching: boolean = false;
  error: string | null = null;
  subscriptions: any[] = [];
  
  // FormControl для поиска
  searchControl = new FormControl('');

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupSearch();
    this.loadProducts();
  }

  /**
   * Настройка поиска с RxJS операторами
   */
  private setupSearch(): void {
    // Создаем Observable для поискового запроса
    const searchQuery$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Начинаем с пустой строки
      debounceTime(300), // Ждем 300ms после последнего ввода
      distinctUntilChanged(), // Игнорируем повторяющиеся значения
      map(query => query?.toLowerCase().trim() || '') // Нормализуем запрос
    );

    // Создаем Observable для всех товаров
    const allProducts$ = new Observable<Product[]>(observer => {
      this.productService.getAllProducts()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (products) => {
            this.products = products;
            observer.next(products);
          },
          error: (error) => {
            this.error = error.message || errorDownload;
            observer.error(error);
          }
        });
    });

    // Комбинируем поиск и товары
    combineLatest([searchQuery$, allProducts$])
      .pipe(
        untilDestroyed(this),
        switchMap(([query, products]) => {
          this.isSearching = true;
          this.cdr.detectChanges();
          
          // Имитируем задержку поиска
          return of(this.filterProducts(products, query)).pipe(
            debounceTime(200) // Имитация времени поиска
          );
        })
      )
      .subscribe({
        next: (filteredProducts) => {
          this.filteredProducts = filteredProducts;
          this.isSearching = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при поиске';
          this.isSearching = false;
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Фильтрация товаров по поисковому запросу
   */
  private filterProducts(products: Product[], query: string): Product[] {
    if (!query) {
      return products; // Возвращаем все товары, если запрос пустой
    }

    return products.filter(product => {
      const searchFields = [
        product.title.toLowerCase(),
        product.description.toLowerCase(),
        product.category.toLowerCase(),
        product.price.toString()
      ];

      return searchFields.some(field => field.includes(query));
    });
  }

  /**
   * Загрузка всех товаров (устаревший метод, оставлен для совместимости)
   */
  public loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.cdr.detectChanges();
    
    this.productService.getAllProducts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = products; // Инициализируем отфильтрованные товары
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.error = error.message || errorDownload;
          this.isLoading = false;
          console.error('Error loading products:', error);
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Очистка поиска
   */
  public clearSearch(): void {
    this.searchControl.setValue('');
  }
}
