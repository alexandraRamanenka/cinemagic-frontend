import { SeatsLine } from '@shared/models/seatsLine';
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
  seatsSchema: Seat[][];

  private getSeatsSchema(): Seat[][] {
    let schema = [] as Seat[][];

    console.log('schma rendering');
    schema = [...this.seatsShemaGenerator(this.hall.seatsSchema)];
    schema = this.mapSeatsStates(schema, this.blockedSeats);
    schema = this.mapSeatsStates(schema, this.reservedSeats);
    return schema;
  }

  private *seatsShemaGenerator(lines: SeatsLine[]) {
    let currentNumber = 1;

    for (const line of lines) {
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
    const reservedSeats = reservations.flatMap(
      reservation => reservation.seats
    );
    return reservedSeats;
  }

  private mapSeatsStates(schema: Seat[][], seatsToMap: BlockedSeat[]) {
    const completeSchema = [...schema];
    seatsToMap.forEach(seat => {
      completeSchema[seat.line - 1][seat.seatNumber - 1].isBlocked = true;
    });
    return completeSchema;
  }

  private subscribeToBlockedSeats() {
    this.reservationService.blockedSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeats => {
        this.blockedSeats = blockedSeats;
        this.seatsSchema = this.getSeatsSchema();
      });
  }

  private subscribeToChosenSeats() {
    this.reservationService.chosenSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(chosenSeats => {
        this.chosenSeats = chosenSeats;
        this.seatsSchema = this.getSeatsSchema();
        this.loading = false;
      });
  }

  constructor(private reservationService: ReservationService) {
    this.hall = this.reservationService.session.hall;
    this.reservedSeats = this.getReservedSeats(
      this.reservationService.session.reservations
    );
    this.subscribeToBlockedSeats();
    this.subscribeToChosenSeats();
    this.reservationService.getChosenSeats();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeSeat(blockedSeat: BlockedSeat) {
    this.reservationService.removeSeat(blockedSeat);
  }

  getBlockedSeatNumber(blockedSeat: BlockedSeat) {
    const seat = this.seatsSchema[blockedSeat.line - 1][
      blockedSeat.seatNumber - 1
    ];
    return seat.number;
  }
}
