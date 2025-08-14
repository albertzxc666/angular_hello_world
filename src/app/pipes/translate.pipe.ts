import { Pipe, PipeTransform, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LanguageService, TranslationParams } from '../services/language.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly languageService = inject(LanguageService);
  private readonly cdr = inject(ChangeDetectorRef);
  private subscription?: Subscription;
  private lastKey = '';
  private lastParams?: TranslationParams;

  transform(key: string, params?: TranslationParams): string {
    // Если ключ или параметры изменились, обновляем подписку
    if (this.lastKey !== key || JSON.stringify(this.lastParams) !== JSON.stringify(params)) {
      this.lastKey = key;
      this.lastParams = params;
      
      // Отписываемся от предыдущей подписки
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      
      // Подписываемся на изменения языка
      this.subscription = this.languageService.getCurrentLanguage$().subscribe(() => {
        this.cdr.markForCheck();
      });
    }
    
    return this.languageService.translate(key, params);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
