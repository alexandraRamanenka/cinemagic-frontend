import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/user';
import { ProfileService } from '../../services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Response } from '@shared/models/response';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  loading = true;
  user: User;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: Response) => {
          this.user = res.data.user;
          this.loading = false;
        }
      });
  }
}
