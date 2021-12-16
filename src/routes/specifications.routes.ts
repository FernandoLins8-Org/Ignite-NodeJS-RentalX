import { Router, Request, Response } from 'express';

import specificationCreateController from '../modules/cars/useCases/createSpecification';

const specificationsRouter = Router();

specificationsRouter.post('/', (req, res) => specificationCreateController.handle(req, res));

// specificationsRouter.get('/', (req, res) => {
//   const specifications = specificationsRepository.list();
//   return res.json(specifications);
// });

export default specificationsRouter;
