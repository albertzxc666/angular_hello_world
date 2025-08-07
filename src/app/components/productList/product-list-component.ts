import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchComponent } from '../search/search-component';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-product-list-component',
  imports: [RouterModule, CommonModule, SearchComponent],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.scss'
})
export class ProductListComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent!: SearchComponent;

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public isLoading: boolean = false;
  public isSearching: boolean = false;
  public error: string | null = null;
  public subscriptions: any[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Обработка результатов поиска от компонента поиска
   */
  public onSearchResults(filteredProducts: Product[]): void {
    this.filteredProducts = filteredProducts;
    this.cdr.detectChanges();
  }

  /**
   * Обработка изменения состояния поиска
   */
  public onSearchingChange(isSearching: boolean): void {
    this.isSearching = isSearching;
    this.cdr.detectChanges();
  }

  /**
   * Обработка изменения поискового запроса
   */
  public onSearchQueryChange(query: string): void {
    // Выполняем поиск с текущими товарами
    if (this.searchComponent) {
      this.searchComponent.performSearch(this.products);
    }
  }

  /**
   * Инициализация поиска после загрузки товаров
   */
  private initializeSearch(): void {
    if (this.searchComponent) {
      this.searchComponent.initializeSearch(this.products);
    }
  }

  /**
   * Загрузка всех товаров
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
          
          // Инициализируем поиск после загрузки товаров
          setTimeout(() => {
            this.initializeSearch();
          }, 0);
        },
        error: (error) => {
          this.error = error.message || 'Ошибка при загрузке товаров';
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
    if (this.searchComponent) {
      this.searchComponent.clearSearch();
    }
  }
}
