import { UserService } from '@shared/services/user.service';
import { StorageKeys } from './shared/enums/storageKeys';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinemagic-frontend';

  constructor(private router: Router, private userService: UserService) {}

  @HostListener('window:storage', ['$event']) onLocalStorageChanged(event) {
    if (event.storageArea === localStorage) {
      const user = localStorage.getItem(StorageKeys.User);
      if (!user) {
        this.userService.deleteCurrentUser();
        this.router.navigateByUrl('/');
      } else {
        const userObj = this.userService.parseUser(user);
        this.userService.setCurrentUser(userObj);
      }
    }
  }
}
