import { AlertTypes } from './../enums/alertTypes';
import { StorageKeys } from '@shared/enums/storageKeys';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Response } from '../models/response';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResponseStatusTypes } from '@shared/enums/responseStatusTypes';
import { environment } from '@env/environment';

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
      this.parseUser(localStorage.getItem(StorageKeys.User))
    );
  }

  setCurrentUser(user: User) {
    if (user.avatar && !user.avatar.startsWith('https')) {
      user.avatar = environment.url + user.avatar;
    }
    localStorage.setItem(StorageKeys.User, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  deleteCurrentUser() {
    localStorage.removeItem(StorageKeys.User);
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

  updateMe(userFields: FormData) {
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

  parseUser(userStr: string): User {
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (error) {
      this.alertService.sendAlert('Please, log in again...', AlertTypes.Error);
      this.deleteCurrentUser();
      this.router.navigateByUrl('/login');
      return null;
    }
  }
}
