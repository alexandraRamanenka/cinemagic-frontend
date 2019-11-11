import { FilteringService } from '@shared/services/filtering.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { AfishaRoutingModule } from './afisha-routing.module';
import { AfishaPageComponent } from './components/afisha-page/afisha-page.component';
import { SessionsFiltersComponent } from './components/sessions-filters/sessions-filters.component';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';

@NgModule({
  declarations: [
    AfishaPageComponent,
    SessionsFiltersComponent,
    SessionsListComponent
  ],
  imports: [AfishaRoutingModule, SharedModule],
  providers: [FilteringService]
})
export class AfishaModule {}
