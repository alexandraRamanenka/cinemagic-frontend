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
  private onChange = (seats: Seat[]) => {};

  @Input() schema: Seat[][];
  selectedSeat: Seat;
  seats: Seat[] = [];

  constructor(private reservationService: ReservationService) {}

  setSeat(seat: Seat) {
    this.selectedSeat = seat.isBlocked ? this.selectedSeat : seat;
  }

  addSeat() {
    this.seats.push(this.selectedSeat);
    this.onChange(this.seats);
    this.reservationService.addSeat(this.selectedSeat);
    this.selectedSeat = null;
  }

  isChoosen(seat: Seat): boolean {
    return this.seats.some(s => s.number === seat.number);
  }

  writeValue(seats: Seat[]): void {
    this.seats = seats;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
