import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CinemaPageComponent } from './components/cinema-page/cinema-page.component';

const routes: Routes = [
  {
    path: '',
    component: CinemaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CinemaRoutingModule {}
