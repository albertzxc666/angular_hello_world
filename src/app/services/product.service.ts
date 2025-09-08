import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timeout } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { ERROR_MESSAGES } from '../consts/error.const';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly timeout = environment.apiTimeout;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Добавьте здесь заголовки для реального API:
      // 'Authorization': 'Bearer your-token',
      // 'X-API-Key': 'your-api-key'
    })
  };

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.httpOptions).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`, this.httpOptions).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  public createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, this.httpOptions).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  public updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product, this.httpOptions).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  public deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`, this.httpOptions).pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = ERROR_MESSAGES.GENERAL_ERROR;
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR + ': ' + error.error.message;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Некорректный запрос';
          break;
        case 401:
          errorMessage = 'Не авторизован';
          break;
        case 403:
          errorMessage = 'Доступ запрещен';
          break;
        case 404:
          errorMessage = 'Ресурс не найден';
          break;
        case 500:
          errorMessage = 'Внутренняя ошибка сервера';
          break;
        default:
          errorMessage = ERROR_MESSAGES.GENERAL_ERROR + '. Код ошибки: ' + error.status;
      }
    }
    
    if (environment.enableLogging) {
      console.error('Ошибка HTTP запроса:', error);
    }
    
    return throwError(() => new Error(errorMessage));
  }
}