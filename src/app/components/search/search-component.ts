import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';
import { Product } from '../../models/Product.model';

@UntilDestroy({ arrayName: 'subscriptions' })
@Component({
  selector: 'app-search-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-component.html',
  styleUrl: './search-component.scss'
})
export class SearchComponent implements OnInit {
  @Output() searchResults = new EventEmitter<Product[]>();
  @Output() isSearchingChange = new EventEmitter<boolean>();
  @Output() searchQueryChange = new EventEmitter<string>();

  public isSearching: boolean = false;
  public searchResultsCount: number = 0;
  public subscriptions: any[] = [];
  
  // FormControl для поиска
  public searchControl = new FormControl('');

  private cdr = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.setupSearch();
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

    // Подписываемся на изменения поискового запроса
    searchQuery$
      .pipe(untilDestroyed(this))
      .subscribe(query => {
        this.searchQueryChange.emit(query);
      });

    // Эмитим состояние поиска
    this.searchControl.valueChanges
      .pipe(
        untilDestroyed(this),
        map(() => true),
        debounceTime(300),
        switchMap(() => of(false).pipe(debounceTime(200)))
      )
      .subscribe(isSearching => {
        this.isSearching = isSearching;
        this.isSearchingChange.emit(isSearching);
        this.cdr.detectChanges();
      });
  }

  /**
   * Фильтрация товаров по поисковому запросу
   */
  public filterProducts(products: Product[], query: string): Product[] {
    if (!query) {
      this.searchResultsCount = products.length;
      return products; // Возвращаем все товары, если запрос пустой
    }

    const filteredProducts = products.filter(product => {
      const searchFields = [
        product.title.toLowerCase(),
        product.description.toLowerCase(),
        product.category.toLowerCase(),
        product.price.toString()
      ];

      return searchFields.some(field => field.includes(query));
    });

    this.searchResultsCount = filteredProducts.length;
    return filteredProducts;
  }

  /**
   * Обработка поиска с товарами
   */
  public performSearch(products: Product[]): void {
    const query = this.searchControl.value?.toLowerCase().trim() || '';
    const filteredProducts = this.filterProducts(products, query);
    this.searchResults.emit(filteredProducts);
  }

  /**
   * Инициализация поиска с товарами
   */
  public initializeSearch(products: Product[]): void {
    this.performSearch(products);
  }

  /**
   * Очистка поиска
   */
  public clearSearch(): void {
    this.searchControl.setValue('');
  }

  /**
   * Получение текущего значения поиска
   */
  public getSearchValue(): string {
    return this.searchControl.value || '';
  }

  /**
   * Проверка, есть ли активный поиск
   */
  public hasActiveSearch(): boolean {
    return !!this.searchControl.value;
  }
} 