import { Request, Response } from 'express';

import orderModel from './order.model';

// import { orderSchema } from './order.zodValidation';

const createOrderBike = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // make order
    const order = new orderModel({
      email,
      product,
      quantity,
      totalPrice,
    });

    // save
    await order.save();

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed create to order',
      success: false,
      err,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    //set agregation pipeline
    const result = await orderModel.aggregate([
      {
        $lookup: {
          from: 'bikes',
          localField: 'product',
          foreignField: '_id',
          as: 'bikeDetails',
        },
      },
      {
        $unwind: '$bikeDetails',
      },
      {
        $project: {
          totalRevenue: {
            $multiply: ['$quantity', '$bikeDetails.price'],
          },
        },
      },
      {
        //set total revenue
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue: result[0].totalRevenue,
        },
      });
    } else {
      res.status(200).json({
        message: 'No orders found',
        status: false,
        data: {
          totalRevenue: 0,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'Failed to calculate revenue',
      status: false,
      err,
    });
  }
};

export const orderController = {
  createOrderBike,
  calculateRevenue,
};
