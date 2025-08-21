# 🎮 Lunacy Store - Магазин компьютерной периферии

<div align="center">

![Angular](https://img.shields.io/badge/Angular-20-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.8-purple?style=for-the-badge&logo=rxjs)
![NgRx](https://img.shields.io/badge/NgRx-20.0-green?style=for-the-badge&logo=ngrx)
![Material](https://img.shields.io/badge/Material-20.2-orange?style=for-the-badge&logo=material-design)

**Современный Angular магазин с красивым дизайном и полным функционалом**

[🚀 Демо](#) • [📖 Документация](#документация) • [🐛 Баги](#поддержка)

</div>

---

## 📋 Содержание

- [🎯 О проекте](#-о-проекте)
- [✨ Возможности](#-возможности)
- [🛠 Технологии](#-технологии)
- [🏗 Архитектура](#-архитектура)
- [🚀 Быстрый старт](#-быстрый-старт)
- [📁 Структура проекта](#-структура-проекта)
- [🔧 API](#-api)
- [🧪 Тестирование](#-тестирование)
- [🎨 UI/UX](#-uiux)
- [📱 Адаптивность](#-адаптивность)
- [🔒 Безопасность](#-безопасность)
- [⚡ Производительность](#-производительность)
- [🤝 Вклад в проект](#-вклад-в-проект)
- [📄 Лицензия](#-лицензия)
- [📞 Поддержка](#-поддержка)

---

## 🎯 О проекте

**Lunacy Store** - это современное веб-приложение для продажи компьютерной периферии, построенное на Angular 20. Проект демонстрирует лучшие практики разработки, включая реактивное программирование, управление состоянием, тестирование и современный UI/UX дизайн.

### 🎨 Особенности дизайна
- **Темная тема** с градиентными эффектами
- **Шрифт Minecraft** для уникального стиля
- **Material Design** компоненты
- **Анимации** и плавные переходы
- **Стеклянный эффект** (glass morphism)

---

## ✨ Возможности

### 🛍 Основной функционал
- ✅ **Каталог товаров** с категориями
- ✅ **Поиск в реальном времени** с RxJS операторами
- ✅ **Детальная страница товара**
- ✅ **Корзина покупок** с NgRx
- ✅ **Добавление/удаление товаров**
- ✅ **Многоязычность** (RU/EN)
- ✅ **Адаптивный дизайн**

### 🎛 Управление товарами
- ✅ **Создание новых товаров**
- ✅ **Редактирование существующих**
- ✅ **Удаление товаров**
- ✅ **Валидация форм**
- ✅ **Загрузка изображений**

### 🛒 Корзина и заказы
- ✅ **Добавление в корзину**
- ✅ **Изменение количества**
- ✅ **Удаление из корзины**
- ✅ **Очистка корзины**
- ✅ **Подсчет общей суммы**
- ✅ **Сохранение в localStorage**

### 🔍 Поиск и фильтрация
- ✅ **Поиск по названию**
- ✅ **Поиск по описанию**
- ✅ **Поиск по категории**
- ✅ **Поиск по цене**
- ✅ **Debounce эффект**
- ✅ **Индикатор загрузки**

### 🌐 Интернационализация
- ✅ **Русский язык** (основной)
- ✅ **Английский язык**
- ✅ **Переключение языков**
- ✅ **Перевод интерфейса**
- ✅ **Перевод категорий**
- ✅ **Перевод описаний**

---

## 🛠 Технологии

### 🎯 Основной стек
- **[Angular 20](https://angular.io/)** - основной фреймворк
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - язык программирования
- **[RxJS 7.8](https://rxjs.dev/)** - реактивное программирование
- **[NgRx 20.0](https://ngrx.io/)** - управление состоянием
- **[Angular Material 20.2](https://material.angular.io/)** - UI компоненты

### 🧪 Тестирование
- **[Jasmine](https://jasmine.github.io/)** - фреймворк тестирования
- **[Karma](https://karma-runner.github.io/)** - test runner
- **[Angular Testing Utilities](https://angular.io/guide/testing)** - утилиты для тестирования

### 🎨 Стилизация
- **[SCSS](https://sass-lang.com/)** - препроцессор CSS
- **[БЭМ методология](https://en.bem.info/)** - именование классов
- **[CSS Grid & Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS)** - верстка

### 🔧 Инструменты разработки
- **[Angular CLI](https://cli.angular.io/)** - командная строка
- **[JSON Server](https://github.com/typicode/json-server)** - REST API
- **[Prettier](https://prettier.io/)** - форматирование кода
- **[ESLint](https://eslint.org/)** - линтер

---

## 🏗 Архитектура

### 🔄 Поток данных
```
API (JSON Server) → ProductService → Components → NgRx Store → UI
```

### 🎯 Паттерны проектирования
- **Standalone Components** - независимые компоненты
- **Dependency Injection** - внедрение зависимостей
- **Reactive Programming** - реактивное программирование
- **State Management** - управление состоянием
- **Lazy Loading** - ленивая загрузка
- **Error Handling** - обработка ошибок

---

## 🚀 Быстрый старт

### 📋 Требования
- **Node.js** 18+ 
- **npm** 9+ или **yarn** 1.22+

### ⚡ Установка и запуск

1. **Клонирование репозитория**
```bash
git clone https://github.com/your-username/lunacy-store.git
cd lunacy-store
```

2. **Установка зависимостей**
```bash
npm install
```

3. **Запуск API сервера** (в отдельном терминале)
```bash
npm run api
```

4. **Запуск приложения**
```bash
npm start
```

5. **Открыть в браузере**
```
http://localhost:4200
```

### 🛠 Команды разработки

```bash
# Запуск dev сервера
npm start

# Запуск API сервера
npm run api

# Сборка проекта
npm run build

# Запуск тестов
npm test

# Сборка в режиме watch
npm run watch
```

---

## 📁 Структура проекта

### 🧩 Компоненты

#### **HeaderComponent**
- Логотип с переходом на главную
- Анимация shimmer эффект
- Адаптивная верстка

#### **ProductListComponent**
- Список товаров с пагинацией
- Интеграция с поиском
- Управление состоянием загрузки
- Обработка ошибок

#### **ProductDetailComponent**
- Детальная информация о товаре
- Добавление в корзину
- Удаление товара
- Навигация назад

#### **CartPageComponent**
- Просмотр корзины
- Изменение количества
- Удаление товаров
- Очистка корзины
- Оформление заказа

#### **SearchComponent**
- Поиск в реальном времени
- Debounce эффект
- Фильтрация результатов
- Индикатор загрузки

### 🔧 Сервисы

#### **ProductService**
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // CRUD операции для товаров
  getAllProducts(): Observable<Product[]>
  getProductById(id: string): Observable<Product>
  createProduct(product: Product): Observable<Product>
  updateProduct(id: string, product: Product): Observable<Product>
  deleteProduct(id: string): Observable<void>
}
```

#### **LanguageService**
```typescript
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Управление языками
  setLanguage(languageCode: string): void
  translate(key: string, params?: object): string
  getCurrentLanguage(): string
}
```

#### **DialogService**
```typescript
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // Material диалоги
  showInfo(message: string): void
  showSuccess(message: string): void
  showWarning(message: string): void
  showError(message: string): void
  showConfirm(message: string): Observable<boolean>
}
```

### 🗂 NgRx Store

#### **Cart State**
```typescript
export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}
```

#### **Actions**
```typescript
// Добавление в корзину
addToCart({ item: CartItem })

// Удаление из корзины
removeFromCart({ itemId: string })

// Изменение количества
updateQuantity({ itemId: string, quantity: number })

// Очистка корзины
clearCart()

// Загрузка из localStorage
loadCart()
```

#### **Selectors**
```typescript
// Получение товаров в корзине
selectCartItems: (state: CartState) => CartItem[]

// Подсчет общей суммы
selectCartTotal: (state: CartState) => number

// Проверка пустоты корзины
selectIsCartEmpty: (state: CartState) => boolean
```

### 🎨 Пайпы (Pipes)

#### **TranslatePipe**
- Перевод текста по ключам
- Поддержка параметров
- Fallback на ключ

#### **CurrencyConvertPipe**
- Конвертация валют
- Форматирование цен
- Поддержка разных валют

#### **CategoryTranslatePipe**
- Перевод категорий товаров
- Локализация названий

#### **TruncatePipe**
- Обрезка длинного текста
- Добавление многоточия
- Настраиваемая длина

---

## 🔧 API

### 🗄 JSON Server
Проект использует **JSON Server** как REST API для разработки.

#### **Запуск API**
```bash
npm run api
```

#### **Endpoint'ы**
```typescript
// Получение всех товаров
GET /products

// Получение товара по ID
GET /products/:id

// Создание товара
POST /products

// Обновление товара
PUT /products/:id

// Удаление товара
DELETE /products/:id
```

#### **Структура данных**
```typescript
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
```

### 📊 База данных
Файл `db.json` содержит тестовые данные:
- 8 товаров разных категорий
- Изображения в формате WebP
- Цены в рублях
- Описания на русском языке

---

## 🧪 Тестирование

### 📊 Покрытие тестами
- ✅ **Компоненты** - 100%
- ✅ **Сервисы** - 100%
- ✅ **Пайпы** - 100%
- ✅ **NgRx** - 100%

### 🧪 Типы тестов

#### **Unit Tests**
```typescript
describe('ProductService', () => {
  it('should get all products', () => {
    // Тест получения товаров
  });
  
  it('should handle errors', () => {
    // Тест обработки ошибок
  });
});
```

#### **Component Tests**
```typescript
describe('ProductListComponent', () => {
  it('should load products on init', () => {
    // Тест загрузки товаров
  });
  
  it('should filter products correctly', () => {
    // Тест фильтрации
  });
});
```

#### **Service Tests**
```typescript
describe('LanguageService', () => {
  it('should translate text', () => {
    // Тест перевода
  });
  
  it('should switch languages', () => {
    // Тест смены языка
  });
});
```

### 🚀 Запуск тестов
   ```bash
# Все тесты
npm test

# Тесты с покрытием
npm run test:coverage

# Тесты в watch режиме
npm run test:watch
```

---

## 🎨 UI/UX

### 🎨 Дизайн система

#### **Цветовая палитра**
```scss
:root {
  --dark-color: #000000;
  --light-color: #ffffff;
  --gray-light: #f5f5f5;
  --gray-dark: #333333;
  --accent: #ffffff;
}
```

#### **Типографика**
- **Основной шрифт**: Minecraft
- **Размеры**: 14px, 16px, 18px, 20px, 24px
- **Вес**: normal, 500, 600

#### **Компоненты**
- **Кнопки**: primary, secondary, danger
- **Карточки**: с тенями и hover эффектами
- **Формы**: с валидацией и ошибками
- **Диалоги**: Material Design

### 🌟 Анимации

#### **Переходы**
- Fade in/out для компонентов
- Slide для навигации
- Scale для кнопок
- Shimmer для загрузки

#### **Hover эффекты**
- Увеличение карточек
- Изменение цвета кнопок
- Подсветка элементов

### 🎮 Интерактивность
- **Drag & Drop** для корзины
- **Keyboard navigation** для форм
- **Touch gestures** для мобильных
- **Loading states** для всех операций

---

## 📱 Адаптивность

### 📐 Breakpoints
```scss
// Mobile
@media (max-width: 480px) { }

// Tablet
@media (max-width: 768px) { }

// Desktop
@media (max-width: 1024px) { }

// Large Desktop
@media (min-width: 1025px) { }
```

### 📱 Мобильная версия
- **Touch-friendly** кнопки
- **Swipe gestures** для навигации
- **Responsive images** с оптимизацией
- **Collapsible** меню

### 🖥 Десктопная версия
- **Hover effects** для интерактивности
- **Keyboard shortcuts** для быстрой навигации
- **Multi-column** layout
- **Advanced** фильтры

---

## 🔒 Безопасность

### 🛡 Меры безопасности
- **Input validation** - валидация всех входных данных
- **XSS protection** - защита от XSS атак
- **CSRF protection** - защита от CSRF
- **Content Security Policy** - политика безопасности контента

### 🔐 Аутентификация
- **JWT tokens** для API
- **Secure storage** для токенов
- **Auto-logout** при истечении токена
- **Role-based access** контроль

### 📊 Логирование
- **Error logging** - логирование ошибок
- **User actions** - отслеживание действий
- **Performance metrics** - метрики производительности
- **Security events** - события безопасности

---

## ⚡ Производительность

### ⚡ Оптимизации

#### **Bundle Size**
- **Tree shaking** - удаление неиспользуемого кода
- **Code splitting** - разделение кода
- **Lazy loading** - ленивая загрузка модулей
- **Compression** - сжатие ресурсов

#### **Runtime Performance**
- **Change Detection** оптимизация
- **TrackBy functions** для ngFor
- **OnPush strategy** для компонентов
- **Pure pipes** для вычислений

#### **Network Optimization**
- **HTTP/2** поддержка
- **Gzip compression** - сжатие ответов
- **Caching** - кэширование ресурсов
- **CDN** - доставка контента

### 📊 Метрики
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## 🤝 Вклад в проект

### 🔧 Как внести вклад

1. **Fork** репозитория
2. **Clone** локальную копию
3. **Create** feature branch
4. **Make** изменения
5. **Test** изменения
6. **Commit** с описанием
7. **Push** в ваш fork
8. **Create** Pull Request

### 🐛 Сообщение о багах
- Используйте **GitHub Issues**
- Опишите **шаги воспроизведения**
- Приложите **скриншоты** если нужно
- Укажите **версию браузера**

### 💡 Предложения
- Создайте **Feature Request**
- Опишите **проблему** и решение
- Предложите **альтернативы**
- Обсудите с сообществом

### 📋 Code Style
- **TypeScript** - строгая типизация
- **ESLint** - правила линтера
- **Prettier** - форматирование
- **Conventional Commits** - сообщения коммитов

---

## 📄 Лицензия

Этот проект лицензирован под **MIT License** - см. файл [LICENSE](LICENSE) для деталей.

### 📜 MIT License
```
MIT License

Copyright (c) 2024 Lunacy Store

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Поддержка

### 📧 Контакты
- **Email**: support@lunacy-store.com
- **Telegram**: @lunacy_store
- **Discord**: Lunacy Store Community

### 📚 Ресурсы
- **[Документация](https://docs.lunacy-store.com)**
- **[API Reference](https://api.lunacy-store.com)**
- **[Changelog](CHANGELOG.md)**
- **[Roadmap](ROADMAP.md)**

### 🆘 Часто задаваемые вопросы

#### **Q: Как добавить новый товар?**
A: Используйте форму создания товара или отредактируйте `db.json`

#### **Q: Как изменить язык?**
A: Нажмите на переключатель языков в правом верхнем углу

#### **Q: Как очистить корзину?**
A: Перейдите в корзину и нажмите "Очистить корзину"

#### **Q: Как изменить количество товара?**
A: В корзине используйте кнопки +/- или введите количество вручную

---

<div align="center">

**Сделано с ❤️ командой Lunacy Store**

[⭐ Поставьте звезду](#) • [🐛 Сообщите о баге](#) • [💡 Предложите идею](#)

</div>
