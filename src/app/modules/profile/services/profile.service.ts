import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get('users/me');
  }

  updateMe(userFields: User) {
    return this.http.post('users/me', userFields);
  }
}
