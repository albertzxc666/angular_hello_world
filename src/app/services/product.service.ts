import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  /**
   * Получение всех товаров категории electronics
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/electronics`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получение продукта по id
   * 
   * @param id 
   * @returns 
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Обработка ошибок HTTP-запросов
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Произошла ошибка при загрузке данных';
    
    if (error.error instanceof ErrorEvent) {
      // Ошибка на стороне клиента
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      // Ошибка на стороне сервера
      errorMessage = `Код ошибки: ${error.status}\nСообщение: ${error.message}`;
    }
    
    console.error('Ошибка HTTP запроса:', error);
    return throwError(() => new Error(errorMessage));
  }
}