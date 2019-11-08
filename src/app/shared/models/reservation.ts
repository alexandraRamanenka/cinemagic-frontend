export interface Reservation {
  _id: string;
  date: Date;
  session: string;
  user: string;
  seats: [];
  services: [];
  price: number;
}
