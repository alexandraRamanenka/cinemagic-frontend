export interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  type: {
    name: string;
    description: string;
  }
}
