import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carsRoutes from './cars.routes';
import categoriesRouter from './categories.routes';
import specificationsRouter from './specifications.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/specifications', specificationsRouter);
router.use('/users', usersRouter);
router.use(authenticateRoutes);
router.use('/cars', carsRoutes);

export default router;
