import { Router } from 'express';

import SpecificationsRepository from '../modules/cars/repositories/SpecificationsRepository';
import CreateSpecificationService from '../modules/cars/services/CreateSpecificationService';

const specificationsRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post('/', (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(specificationsRepository);
  createSpecificationService.execute({
    name,
    description,
  });

  return res.status(201).send();
});

specificationsRouter.get('/', (req, res) => {
  const specifications = specificationsRepository.list();
  return res.json(specifications);
});

export default specificationsRouter;
