import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, Input, OnDestroy } from '@angular/core';
import { Seat } from '@shared/models/seat';
import { ReservationService } from '../../services/reservation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seats-schema',
  templateUrl: './seats-schema.component.html',
  styleUrls: ['./seats-schema.component.scss']
})
export class SeatsSchemaComponent implements OnDestroy {
  @Input() schema: Seat[][];
  @Input() chosenSeats: BlockedSeat[] = [];
  selectedSeat: BlockedSeat;

  private unsubscribe$ = new Subject<void>();

  constructor(private reservationService: ReservationService) {}

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
