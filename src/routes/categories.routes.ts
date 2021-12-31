import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();
const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', (req, res) => listCategoriesController.handle(req, res));

categoriesRouter.post('/import', upload.single('file'), (req, res) => importCategoriesController.handle(req, res));

export default categoriesRouter;
