import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Response } from '../models/response';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResponseStatusTypes } from '@shared/enums/responseStatusTypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;

  public get currentUser(): Observable<User> {
    return this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  }

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
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

  getCurrentUserProfile() {
    this.http.get('users/me').subscribe({
      next: (res: Response<User>) => {
        this.setCurrentUser(res.data);
      },
      error: err => {
        this.alertService.sendAlert(err.message, ResponseStatusTypes.Error);
      }
    });
  }

  updateMe(userFields: User) {
    this.http.post('users/me', userFields).subscribe({
      next: (res: Response<User>) => {
        this.setCurrentUser(res.data);
        this.router.navigateByUrl('me');
      },
      error: err => {
        this.alertService.sendAlert(err.message, ResponseStatusTypes.Error);
      }
    });
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
