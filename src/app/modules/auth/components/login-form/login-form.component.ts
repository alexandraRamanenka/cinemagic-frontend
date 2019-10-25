import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@authModule/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials);
  }
}
