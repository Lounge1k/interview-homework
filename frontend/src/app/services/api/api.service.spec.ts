import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Product } from 'src/app/core/models/warehouseItem';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  // Sample product data
  const mockProduct = {
    id: 1,
    name: 'Sample Product',
    quantity: 10,
    unitPrice: 5.5
  };

  const apiUrl = 'https://l2fth4-3000.csb.app/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product and return the product list', () => {
    const mockProductList: Product[] = [mockProduct];

    service.addProduct(mockProduct).subscribe(products => {
      expect(products).toEqual(mockProductList);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockProductList); // Simulate the response
  });

  it('should return a list of products', () => {
    const mockProductList: Product[] = [mockProduct];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProductList);
    });

    const req = httpMock.expectOne(`${apiUrl}/getAllProducts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductList); // Simulate the response
  });

  it('should update a product and return the updated product', () => {
    const updatedProduct: Product = { ...mockProduct, name: 'Updated Product' };

    service.updateProduct(mockProduct.id, updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ id: mockProduct.id, ...updatedProduct });
    req.flush(updatedProduct); // Simulate the response
  });

  it('should remove a product and complete without content', () => {
    service.removeProduct(mockProduct.id).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ id: mockProduct.id });
  });
});
