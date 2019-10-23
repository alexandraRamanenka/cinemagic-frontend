import { AlertService } from '@shared/services/alert.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '@shared/index';

@NgModule({
  declarations: [SignupFormComponent, LoginFormComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  providers: []
})
export class AuthModule {}
