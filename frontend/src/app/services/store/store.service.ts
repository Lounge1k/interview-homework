import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from 'src/app/core/models/warehouseItem';

interface AppState {
  selectedProduct?: Product;
  products: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class Store {
  constructor(private apiService: ApiService) { }

  private initialState: AppState = {
    products: [],
  };

  private storeSubject = new BehaviorSubject<AppState>(this.initialState);
  private store = this.storeSubject.asObservable();

  private updateStore(payload: Partial<AppState>) {
    const currentState = this.storeSubject.getValue();
    this.storeSubject.next({
      ...currentState,
      ...payload
    });
  }

  // Provide product for editing
  getSelectedProduct(): Observable<Product> {
    return new Observable((observer) => {
      this.store.subscribe((state) => {
        observer.next(state.selectedProduct);
      });
    });
  }

  // Set product for editing
  setSelectedProduct(product?: Product) {
    const currentState = this.storeSubject.getValue();
    this.storeSubject.next({
      ...currentState,
      selectedProduct: product
    });
  }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      this.store.subscribe((state) => {
        observer.next(state.products);
      });
    });
  }

  // Fetch products from the server
  fetchProducts(): Observable<Product[]> {
    return this.apiService.getAllProducts().pipe(
      tap((products) => {
        this.updateStore({ products })
      }),
    )
  }


  // Update selected product 
  updateProduct(id: number, newData: Partial<Product>) {
    return this.apiService.updateProduct(id, newData).pipe(
      tap((updatedProduct) => {
        const currentState = this.storeSubject.getValue();
        // Make product list up-to date
        const updatedProducts = currentState.products.map(product => {
          if (product.id === updatedProduct.id) {
            return { ...updatedProduct }
          }
          return product;
        });
        this.updateStore({
          products: updatedProducts,
          selectedProduct: updatedProduct
        });
      }),
    )
  }

  // Add new product
  addProduct(product: Product) {
    return this.apiService.addProduct(product).pipe(
      tap((products) => {
        this.updateStore({ products })
      }),
    );
  }

  // Remove product 
  deleteProduct(id: number) {
    return this.apiService.removeProduct(id).pipe(
      tap(() => {
        const currentState = this.storeSubject.getValue();
        const updatedProducts = currentState.products.filter(product => product.id !== id);
        this.updateStore({
          products: updatedProducts,
          // If deleting item which selected for edit -> empty form
          selectedProduct: currentState.selectedProduct?.id === id ? undefined : currentState.selectedProduct
        });
      })
    )
  }
}
