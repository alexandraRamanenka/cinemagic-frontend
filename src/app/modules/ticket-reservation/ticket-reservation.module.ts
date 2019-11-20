import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketReservationRoutingModule } from './ticket-reservation-routing.module';
import { SharedModule } from '@shared/index';
import { HallSchemaComponent } from './components/hall-schema/hall-schema.component';
import { TicketReservationPageComponent } from './components/ticket-reservation-page/ticket-reservation-page.component';
import { httpInterceptorProviders } from '@shared/interceptors';
import { ReservationService } from './services/reservation.service';
import { SeatsSchemaComponent } from './components/seats-schema/seats-schema.component';
import { FormsModule } from '@angular/forms';
import { WebSocketModule } from 'app/websocket/webSocket.module';
import { environment } from '@env/environment';
import { ServicesCartComponent } from './components/services-cart/services-cart.component';
import { ServicesService } from './services/services.service';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    HallSchemaComponent,
    TicketReservationPageComponent,
    SeatsSchemaComponent,
    ServicesCartComponent,
    ServiceItemComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    TicketReservationRoutingModule,
    SharedModule,
    FormsModule,
    WebSocketModule.config({
      url: environment.wsUrl
    })
  ],
  providers: [httpInterceptorProviders, ReservationService, ServicesService]
})
export class TicketReservationModule {}
