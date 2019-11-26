import { ServicesCartComponent } from './components/services-cart/services-cart.component';
import { HallSchemaComponent } from './components/hall-schema/hall-schema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketReservationPageComponent } from './components/ticket-reservation-page/ticket-reservation-page.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {
    path: ':id',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: TicketReservationPageComponent,
    children: [
      { path: '', redirectTo: 'seats' },
      {
        path: 'seats',
        component: HallSchemaComponent
      },
      {
        path: 'services',
        component: ServicesCartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketReservationRoutingModule {}
