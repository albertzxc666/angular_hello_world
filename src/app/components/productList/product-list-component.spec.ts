import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list-component';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { Store } from '@ngrx/store';
import { Product } from '../../models/Product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockLanguageService: jasmine.SpyObj<LanguageService>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Test Product 1',
      description: 'Test Description 1',
      price: 100,
      category: 'test',
      image: 'test1.jpg'
    },
    {
      id: '2',
      title: 'Test Product 2',
      description: 'Test Description 2',
      price: 200,
      category: 'test',
      image: 'test2.jpg'
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts', 'deleteProduct']);
    const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['translate', 'getCurrentLanguage$', 'getCurrentLanguage']);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: of({})
    });

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    mockLanguageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    mockStore = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    mockProductService.getAllProducts.and.returnValue(of(mockProducts));
    mockLanguageService.getCurrentLanguage$.and.returnValue(of('ru'));
    mockLanguageService.getCurrentLanguage.and.returnValue('ru');
    mockLanguageService.translate.and.returnValue('Test translation');
    mockStore.select.and.returnValue(of(0)); // Мокаем селектор корзины
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    fixture.detectChanges();
    
    expect(mockProductService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.isLoading).toBeFalse();
  });

  it('should filter products correctly', () => {
    fixture.detectChanges();
    
    component.onSearchQueryChange('Product 1');
    
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Test Product 1');
  });
});
