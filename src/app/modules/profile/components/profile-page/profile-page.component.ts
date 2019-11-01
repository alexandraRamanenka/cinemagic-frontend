import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@shared/models/user';
import { ProfileService } from '../../services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Response } from '@shared/models/response';
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
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.profileService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: Response) => {
          this.user = res.user;
          this.userService.setCurrentUser(res.user);
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
