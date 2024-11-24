import mongoose, { model, Schema } from 'mongoose';
import { Order } from './order.interface';
import bikeModel from '../bike/bike.model';

// Order Schema
const orderSchema = new Schema<Order>(
  {
    email: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike',
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

orderSchema.pre('save', async function (next) {
  const order = this;
  const product = await bikeModel.findById(order.product);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.quantity < order.quantity) {
    throw new Error('Insufficient stock');
  }

  // reduce and stock updates
  product.quantity -= order.quantity;

  if (product.quantity === 0) {
    product.inStock = false;
  }

  // save updated products
  await product.save();
  next();
});

orderSchema.post('save', function (doc, next) {
  console.log('Order created successfully:', doc);
  next();
});

// order model
const orderModel = model<Order>('Order', orderSchema);

export default orderModel;
