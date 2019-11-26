import { SessionStorageKeys } from '@shared/enums/sessionStorageKeys';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { ReservationService } from './../../services/reservation.service';
import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  seats: BlockedSeat[];
  services: ServiceOrder[];

  constructor(private reservationService: ReservationService) {
    this.reservationService.chosenSeats.subscribe(seats => this.seats);
    this.services = JSON.parse(
      sessionStorage.getItem(
        `${this.reservationService.session._id}_${SessionStorageKeys.Services}`
      )
    );
  }

  ngOnInit() {}
}
