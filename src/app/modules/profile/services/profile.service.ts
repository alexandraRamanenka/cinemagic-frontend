import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@shared/models/user';
import { UserService } from '@shared/services/user.service';
import { AlertService } from '@shared/services/alert.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Response } from '@shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileSubject: Subject<User> = new Subject<User>();

  get profile(): Observable<User> {
    return this.profileSubject.asObservable().pipe(distinctUntilChanged());
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  getCurrentUser() {
    return this.http.get('users/me').subscribe({
      next: (res: Response<User>) => {
        console.log(res.data);
        this.userService.setCurrentUser(res.data);
      },
      error: err => {
        this.alertService.sendAlert(err.message, 'error');
      }
    });
  }

  updateMe(userFields: User) {
    return this.http.post('users/me', userFields).subscribe({
      next: (res: Response<User>) => {
        this.userService.setCurrentUser(res.data);
      },
      error: err => {
        this.alertService.sendAlert(err.message, 'error');
      }
    });
  }
}
