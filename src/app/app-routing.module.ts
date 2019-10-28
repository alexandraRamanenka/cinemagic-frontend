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
    path: 'cinema',
    loadChildren: () =>
      import('./modules/cinema/cinema.module').then(
        module => module.CinemaModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
