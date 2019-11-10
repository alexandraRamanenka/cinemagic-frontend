import { Session } from './session';

export interface Reservation {
  _id: string;
  date: Date;
  session: Session;
  user: string;
  seats: [];
  services: [];
  price: number;
}
