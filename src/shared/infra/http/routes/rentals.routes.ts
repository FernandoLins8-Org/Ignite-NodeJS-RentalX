import { Router } from 'express';

import CreateRentalsController from '@modules/rentals/useCases/createRentals/CreateRentalsController';
import ListRentalsByUserController from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import ReturnRentalController from '@modules/rentals/useCases/returnRental/ReturnRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalsController = new CreateRentalsController();
const returnRentalController = new ReturnRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

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

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export default rentalsRoutes;
