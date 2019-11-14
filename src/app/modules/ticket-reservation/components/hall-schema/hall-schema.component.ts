import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Hall } from '@shared/models/hall';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Reservation } from '@shared/models/reservation';
import { Seat } from '@shared/models/seat';

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.scss']
})
export class HallSchemaComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  loading = true;
  hall: Hall;
  reserved: any[] = [];
  blocked: any[] = [];
  selectedSeats: Seat[] = [];
  seats: Seat[] = [];

  get seatsSchema(): Seat[][] {
    let schema = [] as Seat[][];
    let currentSeat = 1;

    this.hall.seatsSchema.forEach((line, lineNumber) => {
      let lineSeats = Array.from({ length: line.numberOfSeats }, (v, i) => {
        const isBlocked =
          this.reserved.some(
            s => s.line === lineNumber + 1 && s.seatNumber === i + 1
          ) ||
          this.blocked.some(
            s => s.line === lineNumber + 1 && s.seatNumber === i + 1
          );

        const seat = {
          number: i + currentSeat,
          type: line.seatType.name,
          isBlocked
        };

        return seat;
      });

      currentSeat += line.numberOfSeats;
      schema.push(lineSeats);
    });

    return schema;
  }

  private getReservedSeats(reservations: Reservation[]) {
    let reserved = [];
    reservations.forEach(reservation => {
      reserved.push(...reservation.seats);
    });
    return reserved;
  }

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.reservationService.blockedSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeats => (this.blocked = blockedSeats));
    this.reservationService.session
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(session => {
        this.hall = session.hall;
        this.reserved = this.getReservedSeats(session.reservations);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
