import { CinemaRoutingModule } from './cinema-routing.module';
import { SharedModule } from '@shared/index';
import { NgModule } from '@angular/core';
import { CinemaPageComponent } from './components/cinema-page/cinema-page.component';
import { SessionPreviewComponent } from './components/session-preview/session-preview.component';
import { CinemaInfoComponent } from './components/cinema-info/cinema-info.component';

@NgModule({
  declarations: [CinemaPageComponent, SessionPreviewComponent, CinemaInfoComponent],
  imports: [SharedModule, CinemaRoutingModule]
})
export class CinemaModule {}
