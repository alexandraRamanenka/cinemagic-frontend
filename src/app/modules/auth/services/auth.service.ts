import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials) {
    this.http
      .post('auth/login', credentials)
      .subscribe(data => console.log(data), err => console.log(err));
  }

  signup(credentials) {
    this.http
      .post('auth/signup', credentials)
      .subscribe(data => console.log(data), err => console.log(err));
  }
}
