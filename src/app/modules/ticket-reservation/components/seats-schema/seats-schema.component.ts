import { BlockedSeat } from '@shared/models/blockedSeat';
import { Component, Input, Provider, forwardRef } from '@angular/core';
import { Seat } from '@shared/models/seat';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SeatsSchemaComponent),
  multi: true
};

@Component({
  selector: 'app-seats-schema',
  templateUrl: './seats-schema.component.html',
  styleUrls: ['./seats-schema.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SeatsSchemaComponent implements ControlValueAccessor {
  private onChange = (seats: BlockedSeat[]) => {};

  @Input() schema: Seat[][];
  selectedSeat: BlockedSeat;
  choosedSeats: BlockedSeat[] = [];

  constructor(private reservationService: ReservationService) {}

  setSeat(seat: Seat, line: number, seatNumber: number) {
    this.selectedSeat = seat.isBlocked
      ? this.selectedSeat
      : { line, seatNumber, session: this.reservationService.sessionId };
  }

  addSeat() {
    this.choosedSeats.push(this.selectedSeat);
    this.onChange(this.choosedSeats);
    this.reservationService.addSeat(this.selectedSeat);
    this.selectedSeat = null;
  }

  isChoosen(line: number, seatNumber: number): boolean {
    return this.choosedSeats.some(
      s => s.seatNumber === seatNumber && s.line === line
    );
  }

  writeValue(seats: BlockedSeat[]): void {
    this.choosedSeats = seats;
    this.onChange(this.choosedSeats);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
