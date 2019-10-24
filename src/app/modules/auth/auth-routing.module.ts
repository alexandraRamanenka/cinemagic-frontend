import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'signup',
    component: SignupFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
