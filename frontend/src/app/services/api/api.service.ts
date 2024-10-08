import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/core/models/warehouseItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `http://localhost:3000/api`; // Replace with your actual API endpoint or get it from env variable

  constructor(private http: HttpClient) { }

  // Add a new product
  addProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl, product)
      .pipe(
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

  // Remove product by Id
  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, { body: { id } }).pipe(
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
