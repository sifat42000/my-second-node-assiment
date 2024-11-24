import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import bikeSchemaZod from './bike.zodValidxation';

//Post Bikes Datas
const createBike = async (req: Request, res: Response) => {
  try {
    const bike = req.body;

    //Zod validation
    const zodSchemaValidation = bikeSchemaZod.parse(bike);

    //Data sent to client side
    const result = await bikeService.createAllBiketoDb(zodSchemaValidation);

    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed create to order',
      success: false,
      err,
    });
  }
};

// Get Bike Datas
const getBike = async (req: Request, res: Response) => {
  console.log(req.query);
  const searchTerm = req.query.searchTerm || '';

  try {
    const filterr = {
      $or: [
        { category: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    console.log(filterr);
    //Data sent to client side
    const result = await bikeService.getAllBikeTODB(filterr);
    console.log(result);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed get bike',
      success: false,
      err,
    });
  }
};

//Get a specific Bike data
const getSIngleBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    //Data sent to client side
    const result = await bikeService.getSpeacikBikeTODB(id);

    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to Bike retrieved ',
      success: false,
      err,
    });
  }
};

//Update bike data
const updateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const bodyy = req.body;

    //Data sent to client side
    const result = await bikeService.updateBikeTODB(id, bodyy);

    res.status(200).json({
      message: 'Bike updated  successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to Bike updated ',
      success: false,
      err,
    });
  }
};

//Delete bike data
const deleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    //Data sent to client side
    await bikeService.deleteBikeToDb(id);

    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      message: 'Failed to Bike deleted ',
      success: false,
      err,
    });
  }
};

export const bikeController = {
  createBike,
  getBike,
  getSIngleBike,
  updateBike,
  deleteBike,
};
