import { Router } from 'express';

import CreateRentalsController from '@modules/rentals/useCases/createRentals/CreateRentalsController';
import ReturnRentalController from '@modules/rentals/useCases/returnRental/ReturnRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const returnRentalController = new ReturnRentalController();

rentalsRoutes.post(
  '/',
  ensureAuthenticated,
  createRentalsController.handle,
);

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  returnRentalController.handle,
);

export default rentalsRoutes;
