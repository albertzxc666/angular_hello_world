import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { ERROR_MESSAGES } from '../consts/error.const';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001';

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product).pipe(
      catchError(this.handleError)
    );
  }

  public updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product).pipe(
      catchError(this.handleError)
    );
  }

  public deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = ERROR_MESSAGES.GENERAL_ERROR;
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR + ': ' + error.error.message;
    } else {
      errorMessage = ERROR_MESSAGES.GENERAL_ERROR + '. Код ошибки: ' + error.status;
    }
    
    console.error('Ошибка HTTP запроса:', error);
    return throwError(() => new Error(errorMessage));
  }
}