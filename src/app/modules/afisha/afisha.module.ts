import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { AfishaRoutingModule } from './afisha-routing.module';
import { AfishaPageComponent } from './components/afisha-page/afisha-page.component';
import { SessionsFiltersComponent } from './components/sessions-filters/sessions-filters.component';
import { SessionsListComponent } from './components/sessions-list/sessions-list.component';
import { MatDatepickerModule } from "@angular/material";

@NgModule({
  declarations: [
    AfishaPageComponent,
    SessionsFiltersComponent,
    SessionsListComponent
  ],
  imports: [AfishaRoutingModule, SharedModule, MatDatepickerModule],
  providers: []
})
export class AfishaModule {}
