import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketReservationRoutingModule } from './ticket-reservation-routing.module';
import { SharedModule } from '@shared/index';
import { SeatsChoosingPageComponent } from './seats-choosing-page/seats-choosing-page.component';

@NgModule({
  declarations: [SeatsChoosingPageComponent],
  imports: [CommonModule, TicketReservationRoutingModule, SharedModule]
})
export class TicketReservationModule {}
