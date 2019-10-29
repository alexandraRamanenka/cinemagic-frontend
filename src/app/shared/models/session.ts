import { Hall } from './hall';
import { Movie } from './movie';

export interface Session {
  _id: string;
  film: Movie;
  dateTime: Date;
  hall: Hall;
  reservations: any[];
  price: number;
}
