import { Router, Request, Response } from 'express';

import CreateSpecificationController from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post('/', createSpecificationController.handle);

// specificationsRouter.get('/', (req, res) => {
//   const specifications = specificationsRepository.list();
//   return res.json(specifications);
// });

export default specificationsRouter;
