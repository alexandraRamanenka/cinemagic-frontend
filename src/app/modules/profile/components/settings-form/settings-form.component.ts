import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@shared/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit() {
    this.userService.currentUser.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: user => {
        console.log(user);
        if (user) {
          this.settingsForm.setValue({
            login: user.login,
            email: user.email,
            phone: user.phone
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
    const userFields = this.settingsForm.value;
    this.userService.updateMe(userFields);
    this.router.navigateByUrl('me');
  }
}
