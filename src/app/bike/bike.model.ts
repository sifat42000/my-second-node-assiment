import { model, Schema } from 'mongoose';
import { Bike } from './bike.interface';

// Bike Schema
const bikeSchema = new Schema<Bike>(
  {
    name: { type: String, requred: true },
    brand: { type: String, requred: true },
    price: { type: Number, requred: true },
    category: {
      type: String,
      requred: true,
      enum: ['Mountain', 'Cargo ', 'Cruiser', 'Electric'],
    },
    description: { type: String, requred: true },
    quantity: { type: Number, requred: true },
    inStock: { type: Boolean, requred: true },
  },
  { timestamps: true },
);

//pre hook
bikeSchema.pre('save', async function (next) {
  if (this.quantity <= 0) {
    this.inStock = false;
  }
  next();
});

//Bike Model
const bikeModel = model<Bike>('bike', bikeSchema);

export default bikeModel;
