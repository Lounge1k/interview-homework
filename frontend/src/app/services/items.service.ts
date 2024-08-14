import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = `https://l2fth4-3000.csb.app/api`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Method to add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllProducts`)
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
