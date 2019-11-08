import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SharedModule } from '@shared/index';
import { ProfileRoutingModule } from './profile-routing.module';
import { httpInterceptorProviders } from '@shared/interceptors';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { ReservationsHistoryComponent } from './components/reservations-history/reservations-history.component';

@NgModule({
  declarations: [ProfilePageComponent, SettingsFormComponent, ReservationsHistoryComponent],
  imports: [SharedModule, ProfileRoutingModule],
  providers: [httpInterceptorProviders]
})
export class ProfileModule {}
