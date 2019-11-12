import { FilteringService } from '@shared/services/filtering.service';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SharedModule } from '@shared/index';
import { ProfileRoutingModule } from './profile-routing.module';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { ReservationsHistoryComponent } from './components/reservations-history/reservations-history.component';
import { ReservationsFiltersComponent } from './components/reservations-filters/reservations-filters.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    SettingsFormComponent,
    ReservationsHistoryComponent,
    ReservationsFiltersComponent
  ],
  imports: [SharedModule, ProfileRoutingModule],
  providers: [FilteringService]
})
export class ProfileModule {}
