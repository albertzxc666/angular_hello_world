import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher-component.html',
  styleUrls: ['./language-switcher-component.scss']
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  
  public readonly availableLanguages = this.languageService.availableLanguages;
  public readonly currentLanguage$ = this.languageService.getCurrentLanguage$();

  public onLanguageChange(language: Language): void {
    this.languageService.setLanguage(language.code);
  }
}
