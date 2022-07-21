import {Router} from 'express';
import Products from '../controllers/productsController';
import dataValidator from '../middleware/dataValidator';
const router = Router();

router
  .get('/', Products.getAll)
  .post('/', dataValidator, Products.create)

export default router