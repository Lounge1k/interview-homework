import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Store } from './store.service';
import { Product } from 'src/app/core/models/warehouseItem';

describe('StoreService', () => {
  let service: Store;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockProduct = {
    id: 1,
    name: 'Sample Product',
    quantity: 10,
    unitPrice: 5.5
  };

  const mockProducts: Product[] = [mockProduct];

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'getAllProducts',
      'updateProduct',
      'addProduct',
      'removeProduct'
    ]);

    TestBed.configureTestingModule({
      providers: [
        Store,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });

    service = TestBed.inject(Store);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should update the selected product', () => {
    service.setSelectedProduct(mockProduct);

    service.getSelectedProduct().subscribe(selectedProduct => {
      expect(selectedProduct).toEqual(mockProduct);
    });
  });

  it('should update the products list', () => {
    service.getAllProducts().subscribe(products => {
      expect(products).toEqual([]);
    });
  });

  it('should fetch products from the API and update the state', () => {
    apiService.getAllProducts.and.returnValue(of(mockProducts));

    service.fetchProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should handle errors when fetching products', () => {
    const errorResponse = 'Failed to fetch products';
    apiService.getAllProducts.and.returnValue(throwError(() => new Error(errorResponse)));

    service.fetchProducts().subscribe({
      next: () => fail('expected an error, not products'),
      error: (error) => {
        expect(error.message).toContain(errorResponse);
      }
    });
  });

  it('should update a product and update the state', () => {
    const updatedProduct = { ...mockProduct, name: 'Updated Product' };
    apiService.getAllProducts.and.returnValue(of(mockProducts));
    service.fetchProducts().subscribe();

    apiService.updateProduct.and.returnValue(of(updatedProduct));

    service.updateProduct(mockProduct.id, updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    service.getAllProducts().subscribe(products => {
      expect(products).toContain(updatedProduct);
    });
  });

  it('should add a product and update the state', () => {
    apiService.addProduct.and.returnValue(of(mockProducts));

    service.addProduct(mockProduct).subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should delete a product and update the state', () => {
    apiService.removeProduct.and.returnValue(of(undefined));

    service.deleteProduct(mockProduct.id).subscribe(() => {
      service.getAllProducts().subscribe(products => {
        expect(products).not.toContain(mockProduct);
      });
    });
  });
});
