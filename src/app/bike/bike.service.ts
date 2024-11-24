import { Bike } from './bike.interface';
import bikeModel from './bike.model';

const createAllBiketoDb = async (bike: Bike) => {
  const result = await bikeModel.create(bike);
  return result;
};

const getAllBikeTODB = async (filter: object) => {
  const result = await bikeModel.find(filter);
  return result;
};

const getSpeacikBikeTODB = async (id: string) => {
  const result = await bikeModel.findOne({ id });
  return result;
};

const updateBikeTODB = async (id: string, data: Partial<Bike>) => {
  const result = await bikeModel.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteBikeToDb = async (id: string) => {
  const result = await bikeModel.findByIdAndDelete(id);
  return result;
};

// const orderBikeToDb = async(id: string)=>{
//     const result = await bikeModel.findById(id)
//     return result
// }

export const bikeService = {
  createAllBiketoDb,
  getAllBikeTODB,
  getSpeacikBikeTODB,
  updateBikeTODB,
  deleteBikeToDb,
};
