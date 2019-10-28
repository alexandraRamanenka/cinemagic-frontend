import { CinemaRoutingModule } from './cinema-routing.module';
import { SharedModule } from '@shared/index';
import { NgModule } from '@angular/core';
import { CinemaPageComponent } from './components/cinema-page/cinema-page.component';

@NgModule({
  declarations: [CinemaPageComponent],
  imports: [SharedModule, CinemaRoutingModule]
})
export class CinemaModule {}
