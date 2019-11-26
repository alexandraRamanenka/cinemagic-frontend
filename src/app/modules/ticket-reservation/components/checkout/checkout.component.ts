import { StorageKeys } from '@shared/enums/storageKeys';
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

  get totalPrice(): number {
    const seatsSchema = this.reservationService.session.hall.seatsSchema;
    let price = this.seats.reduce((acc, seat) => {
      return acc + seatsSchema[seat.line].seatType.price;
    }, 0);

    price += this.services.reduce((acc, order) => {
      return acc + order.service.price * order.amount;
    }, 0);

    return (price += this.reservationService.session.price);
  }

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.seats = JSON.parse(
      sessionStorage.getItem(
        `${this.reservationService.session._id}_${StorageKeys.Seats}`
      )
    );

    if (!this.seats) {
      this.router.navigateByUrl(
        `/reserve-ticket/${this.reservationService.session._id}/seats-choose`
      );
    }
    this.services = JSON.parse(
      sessionStorage.getItem(
        `${this.reservationService.session._id}_${StorageKeys.Services}`
      )
    );
  }

  ngOnInit() {}
}
