import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
  },
  {
    path: 'cinema',
    loadChildren: () =>
      import('./modules/cinema/cinema.module').then(
        module => module.CinemaModule
      )
  },
  {
    path: 'afisha',
    loadChildren: () =>
      import('./modules/afisha/afisha.module').then(
        module => module.AfishaModule
      )
  },
  {
    path: 'reserve-ticket',
    loadChildren: () =>
      import('./modules/ticket-reservation/ticket-reservation.module').then(
        module => module.TicketReservationModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
