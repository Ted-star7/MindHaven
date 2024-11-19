import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsumeService {
  private url: string = ""; 

  constructor(private httpClient: HttpClient) {}

  // Method for POST request 
  public postRequest(endpoint: string, data: any, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
      "ngrok-skip-browser-warning": "6024"
    });
    return this.httpClient.post(`${this.url}${endpoint}`, FormData, { headers })
      .pipe(catchError(this.handleError));
  }
  
  // Method for POST request 
  public postFormData(endpoint: string, formData: any, token: string | null = null): Observable<any> {
    let headers = new HttpHeaders({
      "ngrok-skip-browser-warning": "6024"
    });

    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`);
    }

    return this.httpClient.post(`${this.url}${endpoint}`, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Method for GET request
  public getRequest(endpoint: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": "6024"
    });
    return this.httpClient.get(`${this.url}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
