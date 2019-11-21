import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, Input, OnDestroy } from '@angular/core';
import { Seat } from '@shared/models/seat';
import { ReservationService } from '../../services/reservation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-seats-schema',
  templateUrl: './seats-schema.component.html',
  styleUrls: ['./seats-schema.component.scss']
})
export class SeatsSchemaComponent implements OnDestroy {
  @Input() schema: Seat[][];

  selectedSeat: BlockedSeat;
  chosenSeats: BlockedSeat[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private reservationService: ReservationService) {
    this.reservationService.chosenSeats
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(seats => (this.chosenSeats = seats));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setSeat(seat: Seat, line: number, seatNumber: number) {
    this.selectedSeat = seat.isBlocked
      ? this.selectedSeat
      : { line, seatNumber, session: this.reservationService.session._id };
  }

  addSeat() {
    this.reservationService.addSeat(this.selectedSeat);
    this.selectedSeat = null;
  }

  isChosen(line: number, seatNumber: number): boolean {
    return this.chosenSeats.some(
      s => s.seatNumber === seatNumber && s.line === line
    );
  }
}
