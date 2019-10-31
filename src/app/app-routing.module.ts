import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './modules/landing/components/landing-page/landing-page.component';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./modules/movies/movies.module').then(
        module => module.MoviesModule
      )
  },
  {
    path: 'me',
    loadChildren: () =>
      import('./modules/profile/profile.module').then(
        module => module.ProfileModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
