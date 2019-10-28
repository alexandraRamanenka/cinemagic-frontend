import { Hall } from './hall';

export interface Cinema {
  city: string;
  name: string;
  address: string;
  halls: Hall[];
}
