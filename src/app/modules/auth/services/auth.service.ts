import { AlertService } from '@shared/services/alert.service';
import { Response } from '@shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';
import { Router } from '@angular/router';
import { ResponseStatusTypes } from '@shared/enums/responseStatusTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autoLogoutTimer: any;

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
        this.autoLogout(res.token.expire);
        this.router.navigateByUrl('me');
      },
      err =>
        this.alertService.sendAlert(
          err.error.message,
          ResponseStatusTypes.Error
        )
    );
  }

  signup(credentials) {
    this.http.post('auth/signup', credentials).subscribe(
      (res: Response<User>) => {
        this.userService.setCurrentUser(res.data);
        this.autoLogout(res.token.expire);
        this.router.navigateByUrl('me');
      },
      err =>
        this.alertService.sendAlert(
          err.error.message,
          ResponseStatusTypes.Error
        )
    );
  }

  logout() {
    this.http.post('auth/logout', null).subscribe(
      res => {
        this.userService.deleteCurrentUser();
        this.router.navigateByUrl('');
        localStorage.clear();
        if (this.autoLogoutTimer) {
          clearTimeout(this.autoLogoutTimer);
        }
        this.autoLogoutTimer = null;
      },
      err =>
        this.alertService.sendAlert(
          err.error.message,
          ResponseStatusTypes.Error
        )
    );
  }

  autoLogout(expireTime: number) {
    this.autoLogoutTimer = setTimeout(() => this.logout(), expireTime);
  }
}
