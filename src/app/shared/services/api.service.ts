import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  get(path: string, params = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.url}${path}`, { params })
      .pipe(catchError((err: any) => throwError(err)));
  }

  post(path: string, body = {}): Observable<any> {
    body = JSON.stringify(body);
    return this.http
      .post(`${environment.url}${path}`, body, this.httpOptions)
      .pipe(catchError((err: any) => throwError(err)));
  }

  patch(path: string, body = {}): Observable<any> {
    return this.http
      .patch(
        `${environment.url}${path}`,
        JSON.stringify(body),
        this.httpOptions
      )
      .pipe(catchError((err: any) => throwError(err)));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.url}${path}`)
      .pipe(catchError((err: any) => throwError(err)));
  }
}
