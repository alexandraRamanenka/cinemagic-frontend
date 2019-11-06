import { AlertService } from '@shared/services/alert.service';
import { Response } from '@shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  login(credentials) {
    this.http.post('auth/login', credentials).subscribe(
      (res: Response<User>) => {
        this.userService.setCurrentUser(res.data);
        this.router.navigateByUrl('me');
      },
      err => this.alertService.sendAlert(err.error.message, err.error.status)
    );
  }

  signup(credentials) {
    this.http.post('auth/signup', credentials).subscribe(
      (res: Response<User>) => {
        this.userService.setCurrentUser(res.data);
        this.router.navigateByUrl('me');
      },
      err => this.alertService.sendAlert(err.error.message, err.error.status)
    );
  }

  logout() {
    this.http.post('auth/logout', null).subscribe(
      res => {
        this.userService.deleteCurrentUser();
        this.router.navigateByUrl('');
      },
      err => this.alertService.sendAlert(err.error.message, err.error.status)
    );
  }
}
