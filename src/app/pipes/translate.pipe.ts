import { Pipe, PipeTransform, inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslationParams } from '../models/Translation.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly languageService = inject(LanguageService);
  private hasSubscription = false;
  private lastKey = '';
  private lastParams?: TranslationParams;

  transform(key: string, params?: TranslationParams): string {
    // Если ключ или параметры изменились, или подписки еще нет, создаем подписку
    if (!this.hasSubscription || this.lastKey !== key || JSON.stringify(this.lastParams) !== JSON.stringify(params)) {
      this.lastKey = key;
      this.lastParams = params;
      
      if (!this.hasSubscription) {
        // Подписываемся на изменения языка
        this.languageService.getCurrentLanguage$()
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            // Теперь Angular автоматически обновит UI благодаря зоне
          });
        this.hasSubscription = true;
      }
    }
    
    return this.languageService.translate(key, params);
  }

  ngOnDestroy(): void {
    // UntilDestroy автоматически отписывается
  }
}
