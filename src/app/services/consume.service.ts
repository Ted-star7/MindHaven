import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsumeService {
  private url: string = ''; // Base API URL

  constructor(private httpClient: HttpClient) {}

  // POST Request
  public postRequest(endpoint: string, data: any, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '6024',
    });

    return this.httpClient
      .post(`${this.url}${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  // POST FormData
  public postFormData(endpoint: string, formData: FormData, token: string | null = null): Observable<any> {
    let headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '6024',
    });

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.httpClient
      .post(`${this.url}${endpoint}`, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  // GET Request
  public getRequest(endpoint: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '6024',
    });

    return this.httpClient
      .get(`${this.url}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Error Handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error instanceof ErrorEvent
        ? `Client-side error: ${error.error.message}`
        : `Server-side error: ${error.status} - ${error.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
