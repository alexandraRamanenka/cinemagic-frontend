import { FilteringService } from '@shared/services/filtering.service';
import { PaginationService } from '@shared/services/pagination.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { AfishaRoutingModule } from './afisha-routing.module';
import { AfishaPageComponent } from './components/afisha-page/afisha-page.component';
import { SessionsFitrersComponent } from './components/sessions-fitrers/sessions-fitrers.component';

@NgModule({
  declarations: [AfishaPageComponent, SessionsFitrersComponent],
  imports: [AfishaRoutingModule, SharedModule],
  providers: [PaginationService, FilteringService]
})
export class AfishaModule {}
