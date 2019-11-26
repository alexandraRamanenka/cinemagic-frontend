import { StorageKeys } from '@shared/enums/storageKeys';
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

  constructor(private reservationService: ReservationService) {
    const seats = JSON.parse(
      localStorage.getItem(
        `${this.reservationService.session._id}_${StorageKeys.Seats}`
      )
    );
    this.seats = Object.values(seats);

    const services = JSON.parse(
      localStorage.getItem(
        `${this.reservationService.session._id}_${StorageKeys.Services}`
      )
    );
    this.services = services ? Object.values(services) : [];
  }

  ngOnInit() {}
}
