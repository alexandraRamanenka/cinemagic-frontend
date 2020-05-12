import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  @ViewChild('avatarInput', {static: false}) avatarInput: ElementRef;
  settingsForm: FormGroup;
  avatar: string;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private userService: UserService, private fb: FormBuilder) {

    this.settingsForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      avatar: [null]
    });
  }

  ngOnInit() {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: user => {
          if (user) {
            this.avatar = user.avatar || environment.defaultAvatar;
            this.settingsForm.setValue({
              login: user.login,
              email: user.email,
              phone: user.phone,
              avatar: null
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveSettings() {
    const userFields = new FormData();
    for (let field in this.settingsForm.value) {
      userFields.append(field, this.settingsForm.value[field]);
    }
    this.userService.updateMe(userFields);
  }

  onAvatarChange(event): void {
    if(event.target.files && event.target.files.length > 0) {
      this.settingsForm.get('avatar').setValue(event.target.files[0]);
      this.avatar = URL.createObjectURL(event.target.files[0]);
    }
  }
}
