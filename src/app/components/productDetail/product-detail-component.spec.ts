import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductDetailComponent } from './product-detail-component';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product.model';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'test',
    image: 'test.jpg'
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductById', 'deleteProduct']);
    const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['translate', 'getCurrentLanguage$', 'getCurrentLanguage']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: of({})
    });

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    mockProductService.getProductById.and.returnValue(of(mockProduct));
    mockLanguageService.getCurrentLanguage$.and.returnValue(of('ru'));
    mockLanguageService.getCurrentLanguage.and.returnValue('ru');
    mockLanguageService.translate.and.returnValue('Test translation');
    mockStore.select.and.returnValue(of(0)); // Мокаем селектор корзины
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on init', () => {
    fixture.detectChanges();
    
    expect(mockProductService.getProductById).toHaveBeenCalledWith('1');
    expect(component.product).toEqual(mockProduct);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle product loading error', () => {
    const errorMessage = 'Error loading product';
    mockProductService.getProductById.and.returnValue(throwError(() => new Error(errorMessage)));

    fixture.detectChanges();
    
    expect(component.error).toBeDefined();
    expect(component.error).toBeTruthy(); // Проверяем, что ошибка установлена
    expect(component.isLoading).toBeFalse();
  });
});

