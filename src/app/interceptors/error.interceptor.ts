import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (environment.enableLogging) {
          console.error('HTTP Error Interceptor:', {
            url: req.url,
            method: req.method,
            status: error.status,
            message: error.message,
            error: error.error
          });
        }

        // Здесь можно добавить глобальную обработку ошибок
        // Например, показ уведомлений, редирект на страницу ошибки и т.д.
        
        return throwError(() => error);
      })
    );
  }
}