import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  authForm: FormGroup;
  mode = '';
  title = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.mode = data[data.length - 1].path;
      this.title = this.mode === 'login' ? 'Log In' : 'Register';
    });

    if (this.mode === 'signup') {
      this.authForm.addControl(
        'login',
        new FormControl('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

  onSubmit() {
    const credentials = this.authForm.value;
    console.log(credentials);
  }
}
