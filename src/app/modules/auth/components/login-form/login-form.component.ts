import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const credentials = this.loginForm.value;
    this.apiService.post(`auth/login`, credentials).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
