import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, Input } from '@angular/core';
import { Seat } from '@shared/models/seat';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-seats-schema',
  templateUrl: './seats-schema.component.html',
  styleUrls: ['./seats-schema.component.scss']
})
export class SeatsSchemaComponent {
  @Input() schema: Seat[][];

  selectedSeat: BlockedSeat;
  chosenSeats: BlockedSeat[] = [];

  constructor(private reservationService: ReservationService) {
    this.reservationService.chosenSeats.subscribe(
      seats => (this.chosenSeats = seats)
    );
  }

  setSeat(seat: Seat, line: number, seatNumber: number) {
    this.selectedSeat = seat.isBlocked
      ? this.selectedSeat
      : { line, seatNumber, session: this.reservationService.sessionId };
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
