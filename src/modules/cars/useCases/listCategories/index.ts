import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import ListCategoriesController from './ListCategoriesController';
import ListCategoryUseCase from './ListCategoriesUseCase';

const categoriesRepository = null;

const listCategoriesUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export default listCategoriesController;
