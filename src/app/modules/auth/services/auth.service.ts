import { AlertService } from '@shared/services/alert.service';
import { Response } from '@shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  login(credentials) {
    this.http.post('auth/login', credentials).subscribe(
      (res: Response) => this.userService.setCurrentUser(res.data.user),
      err => {
        console.log(err.error);
        this.alertService.sendAlert(err.error.message, err.error.status);
      }
    );
  }

  signup(credentials) {
    this.http
      .post('auth/signup', credentials)
      .subscribe(
        (res: Response) => this.userService.setCurrentUser(res.data.user),
        err => this.alertService.sendAlert(err.error.message, err.error.status)
      );
  }

  logout() {
    this.http
      .post('auth/logout', null)
      .subscribe(
        res => this.userService.deleteCurrentUser(),
        err => this.alertService.sendAlert(err.error.message, err.error.status)
      );
  }
}
