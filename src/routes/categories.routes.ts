import { Router } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({
    name,
    description,
  });

  return res.status(201).send();
});

categoriesRouter.get('/', (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});

export default categoriesRouter;
