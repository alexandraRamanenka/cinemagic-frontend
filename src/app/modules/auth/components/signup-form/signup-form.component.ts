import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@authModule/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const credentials = this.signupForm.value;
    this.authService.signup(credentials);
  }
}
