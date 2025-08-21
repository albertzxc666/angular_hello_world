import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/Product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'test',
    image: 'test.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts = [mockProduct];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3001/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by id', () => {
    service.getProductById('1').subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3001/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});
