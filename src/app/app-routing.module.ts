import { SignupFormComponent } from '@authModule/components/signup-form/signup-form.component';
import { LoginFormComponent } from '@authModule/components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
