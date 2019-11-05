import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;

  public get currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  constructor() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject(
        JSON.parse(localStorage.getItem('currentUser'))
      );
    } else {
      this.currentUserSubject = new BehaviorSubject(null);
    }
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  deleteCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
