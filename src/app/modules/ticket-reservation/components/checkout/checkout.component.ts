import { ServiceOrder } from '@shared/models/serviceOrder';
import { Response } from '@shared/models/response';
import { ReservationService } from './../../services/reservation.service';
import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, OnInit } from '@angular/core';
import { Reservation } from '@shared/models/reservation';
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
    return this.reservationService.totalPrice;
  }

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.seats = this.reservationService.seats;
    this.services = this.reservationService.services;
  }

  ngOnInit() {}

  reserve() {
    this.reservationService
      .reserve()
      .subscribe((res: Response<Reservation>) => {
        alert('Tickets succesfully reserved!');
        this.router.navigateByUrl('/me');
      });
  }
}
