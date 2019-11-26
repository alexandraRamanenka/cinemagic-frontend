import { SessionStorageKeys } from '@shared/enums/sessionStorageKeys';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { ReservationService } from './../../services/reservation.service';
import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  seats: BlockedSeat[];
  services: ServiceOrder[];

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.seats = JSON.parse(
      sessionStorage.getItem(
        `${this.reservationService.session._id}_${SessionStorageKeys.Seats}`
      )
    );

    if (!this.seats) {
      this.router.navigateByUrl(
        `/reserve-ticket/${this.reservationService.session._id}/seats-choose`
      );
    }
    this.services = JSON.parse(
      sessionStorage.getItem(
        `${this.reservationService.session._id}_${SessionStorageKeys.Services}`
      )
    );
  }

  ngOnInit() {}
}
