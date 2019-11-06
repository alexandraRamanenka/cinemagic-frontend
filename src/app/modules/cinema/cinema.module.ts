import { CinemaRoutingModule } from './cinema-routing.module';
import { SharedModule } from '@shared/index';
import { NgModule } from '@angular/core';
import { CinemaPageComponent } from './components/cinema-page/cinema-page.component';
import { CinemaInfoComponent } from './components/cinema-info/cinema-info.component';

@NgModule({
  declarations: [CinemaPageComponent, CinemaInfoComponent],
  imports: [SharedModule, CinemaRoutingModule],
  providers: []
})
export class CinemaModule {}
