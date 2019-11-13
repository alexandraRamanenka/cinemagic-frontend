import { Component, OnInit } from '@angular/core';
import { Session } from '@shared/models/session';

@Component({
  selector: 'app-ticket-reservation-page',
  templateUrl: './ticket-reservation-page.component.html',
  styleUrls: ['./ticket-reservation-page.component.scss']
})
export class TicketReservationPageComponent implements OnInit {
  loading = false;
  session: Session;

  constructor() {}

  ngOnInit() {}
}
