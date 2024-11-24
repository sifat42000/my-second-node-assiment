import { z } from 'zod';

const bikeSchemaZod = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum(['Mountain', 'Cargo', 'Cruiser', 'Electric']),
  description: z.string().min(1, 'Description is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative'),
  inStock: z.boolean(),
});

export default bikeSchemaZod;
