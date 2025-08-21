export const VALIDATION_PATTERNS = {
  // Паттерны для товаров
  PRODUCT_TITLE: /^[a-zA-Zа-яА-ЯёЁ0-9\s\-_.,()]{2,100}$/,
  PRICE: /^\d+(\.\d{2})?$/,
  CATEGORY_NAME: /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,30}$/,
  
  // Паттерны для URL и файлов  
  IMAGE_URL: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
  
  // Паттерны для поиска
  SEARCH_QUERY: /^[a-zA-Zа-яА-ЯёЁ0-9\s\-_.,()]{1,50}$/,
  
  // Паттерны для языков
  LANGUAGE_CODE: /^[a-z]{2}$/,
  
  // Email (может понадобиться в будущем)
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Телефон (может понадобиться в будущем)
  PHONE_RU: /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
};

// Функции для валидации с паттернами (используемые в проекте)
export const PATTERN_VALIDATORS = {
  isValidPrice: (price: string): boolean => VALIDATION_PATTERNS.PRICE.test(price),
  isValidProductTitle: (title: string): boolean => VALIDATION_PATTERNS.PRODUCT_TITLE.test(title),
  isValidSearchQuery: (query: string): boolean => VALIDATION_PATTERNS.SEARCH_QUERY.test(query),
  isValidLanguageCode: (code: string): boolean => VALIDATION_PATTERNS.LANGUAGE_CODE.test(code),
  isValidCategoryName: (category: string): boolean => VALIDATION_PATTERNS.CATEGORY_NAME.test(category),
  isValidImageUrl: (url: string): boolean => VALIDATION_PATTERNS.IMAGE_URL.test(url)
};

// Сообщения для паттернов (используемые в проекте)
export const PATTERN_MESSAGES = {
  PRICE: 'Введите корректную цену (например: 100.00)',
  PRODUCT_TITLE: 'Название товара должно содержать от 2 до 100 символов',
  CATEGORY_NAME: 'Название категории должно содержать от 2 до 30 символов',
  IMAGE_URL: 'Введите корректный URL изображения',
  SEARCH_QUERY: 'Поисковый запрос должен содержать от 1 до 50 символов',
  LANGUAGE_CODE: 'Код языка должен состоять из 2 букв (например: ru, en)'
};
