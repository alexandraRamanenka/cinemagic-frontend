import { ReservationsService } from './services/reservations.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketReservationRoutingModule } from './ticket-reservation-routing.module';
import { SharedModule } from '@shared/index';
import { HallSchemaComponent } from './component/hall-schema/hall-schema.component';
import { TicketReservationPageComponent } from './component/ticket-reservation-page/ticket-reservation-page.component';
import { httpInterceptorProviders } from '@shared/interceptors';

@NgModule({
  declarations: [HallSchemaComponent, TicketReservationPageComponent],
  imports: [CommonModule, TicketReservationRoutingModule, SharedModule],
  providers: [httpInterceptorProviders, ReservationsService]
})
export class TicketReservationModule {}
