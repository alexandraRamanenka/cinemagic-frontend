import { Cinema } from '@shared/models/cinema';
import { SeatsLine } from './seatsLine';

export interface Hall {
  cinema: Cinema;
  lines: SeatsLine[];
}
