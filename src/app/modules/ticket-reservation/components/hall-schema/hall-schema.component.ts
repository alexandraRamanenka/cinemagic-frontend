import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Hall } from '@shared/models/hall';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Reservation } from '@shared/models/reservation';
import { Seat } from '@shared/models/seat';
import { BlockedSeat } from '@shared/models/blockedSeat';

@Component({
  selector: 'app-hall-schema',
  templateUrl: './hall-schema.component.html',
  styleUrls: ['./hall-schema.component.scss']
})
export class HallSchemaComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  loading = true;
  hall: Hall;
  reserved: BlockedSeat[] = [];
  blocked: BlockedSeat[] = [];
  choosedSeats: BlockedSeat[] = [];

  get seatsSchema(): Seat[][] {
    let schema = [] as Seat[][];
    let currentSeat = 1;

    this.hall.seatsSchema.forEach(line => {
      let lineSeats = Array.from({ length: line.numberOfSeats }, (v, i) => {
        const seat = {
          number: i + currentSeat,
          type: line.seatType.name
        };
        return seat;
      });

      currentSeat += line.numberOfSeats;
      schema.push(lineSeats);
    });

    this.mapBlockedSeats(schema);

    return schema;
  }

  private getReservedSeats(reservations: Reservation[]) {
    let reserved = [];
    reservations.forEach(reservation => {
      reserved.push(...reservation.seats);
    });
    return reserved;
  }

  private mapBlockedSeats(schema: Seat[][]) {
    this.reserved.forEach(seat => {
      schema[seat.line - 1][seat.seatNumber - 1].isBlocked = true;
    });
    this.blocked.forEach(seat => {
      schema[seat.line - 1][seat.seatNumber - 1].isBlocked = true;
    });
  }

  constructor(private reservationService: ReservationService) {
    this.reservationService.session
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(session => {
        this.hall = session.hall;
        this.reserved = this.getReservedSeats(session.reservations);
      });

    this.reservationService.blockedSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeats => (this.blocked = blockedSeats));

    this.reservationService.choosedSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(choosedSeats => {
        this.choosedSeats = choosedSeats;
        this.loading = false;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeSeat(blockedSeat: BlockedSeat) {
    this.choosedSeats = this.choosedSeats.filter(seat => {
      return (
        seat.line !== blockedSeat.line ||
        seat.seatNumber !== blockedSeat.seatNumber
      );
    });
    this.reservationService.removeSeat(blockedSeat);
  }

  getBlockedSeatNumber(blockedSeat: BlockedSeat) {
    const seat = this.seatsSchema[blockedSeat.line - 1][
      blockedSeat.seatNumber - 1
    ];
    return seat.number;
  }
}
