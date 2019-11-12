export interface Movie {
  _id: string;
  name: string;
  country: string;
  genre: string[];
  year: string;
  language: string;
  restriction: number;
  description: string;
  trailer: string;
  poster: string;
  rate: number;
  duration: number;
  hireStartDate: Date;
  hireEndDate: Date;
}
