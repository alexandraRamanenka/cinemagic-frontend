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
    this.currentUserSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('currentUser'))
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  deleteCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
