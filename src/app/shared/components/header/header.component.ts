import { AuthService } from '@authModule/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
