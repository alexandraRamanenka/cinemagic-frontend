import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { Response } from '@shared/models/response';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.userService.currentUser.subscribe({
      next: user => {
        this.settingsForm.setValue({
          login: user.login,
          email: user.email,
          phone: user.phone
        });
      }
    });
  }

  ngOnInit() {}

  saveSettings() {
    const userFields = this.settingsForm.value;
    this.profileService
      .updateMe(userFields)
      .pipe(take(1))
      .subscribe({
        next: (res: Response) => {
          this.userService.setCurrentUser(res.data.user);
          this.router.navigateByUrl('me');
        }
      });
  }
}
