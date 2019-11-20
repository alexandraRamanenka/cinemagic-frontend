import { SeatsLine } from './../../../../shared/models/seatsLine';
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
  private reservedSeats: BlockedSeat[] = [];
  private blockedSeats: BlockedSeat[] = [];

  loading = true;
  hall: Hall;
  chosenSeats: BlockedSeat[] = [];

  get seatsSchema(): Seat[][] {
    let schema = [] as Seat[][];
    let currentSeat = 1;

    schema = [...this.seatsShemaGenerator(this.hall.seatsSchema)];
    this.mapBlockedSeats(schema);

    return schema;
  }

  private *seatsShemaGenerator(lines: SeatsLine[]) {
    let currentNumber = 1;

    for (let line of lines) {
      yield [
        ...this.generateLineSeats(
          currentNumber,
          line.numberOfSeats,
          line.seatType.name
        )
      ];
      currentNumber += line.numberOfSeats;
    }
  }

  private *generateLineSeats(
    startNumber: number,
    lineLength: number,
    type: string
  ) {
    for (let i = 0; i < lineLength; i++) {
      const seat: Seat = { number: startNumber + i, type };
      yield seat;
    }
  }

  private getReservedSeats(reservations: Reservation[]) {
    let reservedSeats = reservations.flatMap(reservation => reservation.seats);
    return reservedSeats;
  }

  private mapBlockedSeats(schema: Seat[][]) {
    this.reservedSeats.forEach(seat => {
      schema[seat.line - 1][seat.seatNumber - 1].isBlocked = true;
    });
    this.blockedSeats.forEach(seat => {
      schema[seat.line - 1][seat.seatNumber - 1].isBlocked = true;
    });
  }

  constructor(private reservationService: ReservationService) {
    this.reservationService.session
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(session => {
        this.hall = session.hall;
        this.reservedSeats = this.getReservedSeats(session.reservations);
      });

    this.reservationService.blockedSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeats => {
        this.blockedSeats = blockedSeats;
      });

    this.reservationService.chosenSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(chosenSeats => {
        this.chosenSeats = chosenSeats;
        this.loading = false;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeSeat(blockedSeat: BlockedSeat) {
    this.chosenSeats = this.chosenSeats.filter(seat => {
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
