import { Hall } from './hall';

export interface Cinema {
  _id: string;
  city: string;
  name: string;
  address: string;
  halls: Hall[];
}
