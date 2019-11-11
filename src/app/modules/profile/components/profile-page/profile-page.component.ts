import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  loading = true;
  user: User;

  private defaultAvatar = '/assets/defaultUserAvatar.png';
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUserProfile();
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) {
          this.user = user;

          if (!this.user.avatar) {
            this.user.avatar = this.defaultAvatar;
          }

          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editProfile() {
    this.router.navigateByUrl('me/settings');
  }
}
