import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule]
})
export class AuthModule {}
