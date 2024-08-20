import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Product } from 'src/app/core/models/warehouseItem';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product and return the product list', () => {
    const mockProductList: Product[] = [mockProduct];

    service.addProduct(mockProduct).subscribe(products => {
      expect(products).toEqual(mockProductList);
    });
  });

  it('should return a list of products', () => {
    const mockProductList: Product[] = [mockProduct];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProductList);
    });
  });

  it('should update a product and return the updated product', () => {
    const updatedProduct: Product = { ...mockProduct, name: 'Updated Product' };

    service.updateProduct(mockProduct.id, updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

  });

  it('should remove a product and complete without content', () => {
    service.removeProduct(mockProduct.id).subscribe(response => {
      expect(response).toBeUndefined();
    });
  });
});
