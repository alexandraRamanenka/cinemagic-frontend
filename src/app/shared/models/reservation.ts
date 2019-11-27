import { Session } from './session';
import { BlockedSeat } from './blockedSeat';
import { ServiceOrder } from './serviceOrder';

export interface Reservation {
  _id?: string;
  date?: Date;
  session: Session | string;
  user: string;
  seats: BlockedSeat[];
  services?: ServiceOrder[];
  price?: number;
}
