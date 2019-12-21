import { ResponseStatusTypes } from '@shared/enums/responseStatusTypes';
import { AlertService } from '@shared/services/alert.service';
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
  reserving = false;

  get totalPrice(): number {
    return this.reservationService.totalPrice;
  }

  constructor(
    private reservationService: ReservationService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.seats = this.reservationService.seats;
    this.services = this.reservationService.services;
  }

  ngOnInit() {}

  reserve() {
    this.reserving = true;
    this.reservationService.reserve().subscribe(
      (res: Response<Reservation>) => {
        this.reserving = false;
        this.alertService.sendAlert(
          `Ticketes was successfully reserved!`,
          ResponseStatusTypes.Success
        );
        this.router.navigateByUrl('/me');
      },
      err => {
        this.reserving = false;
        this.alertService.sendAlert(
          err.error.message,
          ResponseStatusTypes.Error
        );
      }
    );
  }
}
