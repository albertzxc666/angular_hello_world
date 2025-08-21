import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default language', () => {
    expect(service.getCurrentLanguage()).toBe('ru');
  });

  it('should change language', () => {
    service.setLanguage('en');
    expect(service.getCurrentLanguage()).toBe('en');
  });

  it('should translate text', () => {
    const translation = service.translate('product.title');
    expect(translation).toBeDefined();
  });
});
