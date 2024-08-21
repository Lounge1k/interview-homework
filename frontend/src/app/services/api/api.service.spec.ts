import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Product } from '../../core/models/warehouseItem';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new product', () => {
    const newProduct: Product = { id: 1, name: 'Test Product', quantity: 10, unitPrice: 100 };

    service.addProduct(newProduct).subscribe((products) => {
      expect(products).toEqual([newProduct]);
    });

    const req = httpTestingController.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush([newProduct]);
  });
  it('should get all products', () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', quantity: 5, unitPrice: 50 },
      { id: 2, name: 'Product 2', quantity: 10, unitPrice: 100 },
    ];

    service.getAllProducts().subscribe((fetchedProducts) => {
      expect(fetchedProducts).toEqual(products);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/getAllProducts`);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('should update a product', () => {
    const productId = 1;
    const updatedData: Partial<Product> = { name: 'Updated Product', quantity: 20 };
    const updatedProduct: Product = { id: productId, name: 'Updated Product', quantity: 20, unitPrice: 100 };

    service.updateProduct(productId, updatedData).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ id: productId, ...updatedData });
    req.flush(updatedProduct);
  });

  it('should remove a product', () => {
    const productId = 1;

    service.removeProduct(productId).subscribe(() => {
      // No response expected, just checking for successful deletion
    });

    const req = httpTestingController.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: productId });
    req.flush(null);
  });
});