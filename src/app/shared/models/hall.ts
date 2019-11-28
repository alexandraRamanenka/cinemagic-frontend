import { Cinema } from '@shared/models/cinema';
import { SeatsLine } from './seatsLine';

export interface Hall {
  _id: String;
  cinema: Cinema;
  seatsSchema: SeatsLine[];
  seatsNumber: number;
}
