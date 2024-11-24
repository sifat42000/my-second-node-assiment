import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();

router.post('/products', bikeController.createBike);
router.get('/products', bikeController.getBike);
router.get('/products/:productId', bikeController.getSIngleBike);
router.put('/products/:productId', bikeController.updateBike);
router.delete('/products/:productId', bikeController.deleteBike);

export const bikeRouter = router;
