import { ApiService } from './../../../../shared/services/api.service';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.authForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
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
        'email',
        new FormControl('', [Validators.required, Validators.email])
      );
      this.authForm.addControl(
        'passwordConfirmation',
        new FormControl('', [Validators.required])
      );
    }
  }

  onSubmit() {
    const credentials = this.authForm.value;
    this.apiService.post(`auth/${this.mode}`, credentials).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );

    console.log(credentials);
  }
}
