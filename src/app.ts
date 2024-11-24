import express from 'express';
import cors from 'cors';
import { bikeRouter } from './app/bike/bike.router';
import { orderRouter } from './app/order/order.route';
// import { OrderRoute } from './app/order/order.route';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', bikeRouter);
app.use('/api/orders', orderRouter);
// app.use('/api/orders', OrderRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
