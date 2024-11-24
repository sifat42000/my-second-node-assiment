export type Bike = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Cargo' | 'Cruiser' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
};
