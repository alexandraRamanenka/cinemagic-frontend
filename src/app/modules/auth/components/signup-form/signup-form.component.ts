import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
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
    this.apiService.post(`auth/signup`, credentials).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  }
}
