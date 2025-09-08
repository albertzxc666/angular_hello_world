# Конфигурация для подключения реального API

## Текущая настройка (JSON Server)

### Запуск JSON Server:
```bash
npm run api
```

### URL: `http://localhost:3001`

## Переключение на реальный API

### 1. Обновите environment файлы:

**src/environments/environment.ts** (для разработки):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-domain.com/api', // Замените на ваш API
  apiTimeout: 10000,
  enableLogging: true
};
```

**src/environments/environment.prod.ts** (для продакшена):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  apiTimeout: 15000,
  enableLogging: false
};
```

### 2. Настройте авторизацию (если требуется):

В `src/app/services/product.service.ts` раскомментируйте и настройте заголовки:
```typescript
private readonly httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token', // Для JWT токенов
    'X-API-Key': 'your-api-key', // Для API ключей
    'X-Client-Version': '1.0.0' // Версия клиента
  })
};
```

### 3. Адаптируйте endpoints под ваш API:

Если ваш API использует другие пути, обновите методы в `ProductService`:

```typescript
// Пример для API с другими путями:
public getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/v1/products`, this.httpOptions)
    .pipe(
      timeout(this.timeout),
      catchError(this.handleError)
    );
}
```

### 4. Настройте CORS (если нужно):

Если у вас проблемы с CORS, добавьте в `src/app/app.config.ts`:
```typescript
provideHttpClient(
  withFetch(),
  withInterceptors([
    // Ваши interceptors
  ])
)
```

### 5. Примеры популярных API сервисов:

#### Firebase:
```typescript
apiUrl: 'https://your-project.firebaseio.com'
```

#### Supabase:
```typescript
apiUrl: 'https://your-project.supabase.co/rest/v1'
```

#### Strapi:
```typescript
apiUrl: 'https://your-strapi-instance.com/api'
```

#### Custom REST API:
```typescript
apiUrl: 'https://api.yourdomain.com/v1'
```

### 6. Тестирование подключения:

Создайте тестовый endpoint для проверки:
```typescript
public testConnection(): Observable<any> {
  return this.http.get(`${this.apiUrl}/health`, this.httpOptions).pipe(
    timeout(this.timeout),
    catchError(this.handleError)
  );
}
```

### 7. Обработка ошибок:

Interceptors уже настроены для:
- Логирования ошибок в development режиме
- Автоматического добавления токенов авторизации
- Таймаутов запросов
- Детальной обработки HTTP статус кодов

### 8. Сборка для продакшена:

```bash
ng build --configuration production
```

Это автоматически использует `environment.prod.ts` с настройками для реального API.