import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from 'src/app/core/models/warehouseItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `https://l2fth4-3000.csb.app/api`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Add a new product
  addProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl, product)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getAllProducts`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Update a product by Id
  updateProduct(id: number, updatedData: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}`, { id, ...updatedData })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
