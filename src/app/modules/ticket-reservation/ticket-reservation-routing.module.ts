import { HallSchemaComponent } from './component/hall-schema/hall-schema.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketReservationPageComponent } from './component/ticket-reservation-page/ticket-reservation-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: TicketReservationPageComponent,
    children: [
      { path: '', redirectTo: 'seats-choose' },
      {
        path: 'seats-choose',
        component: HallSchemaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketReservationRoutingModule {}
