import { Router } from 'express';

import CategoriesRepository from '../repositories/CategoriesRepository';

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: 'Category already exists' });
  }
  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRouter.get('/', (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});

export default categoriesRouter;
