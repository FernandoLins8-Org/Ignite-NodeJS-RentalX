import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoriesController from '../modules/cars/useCases/importCategories';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();
const upload = multer({
  dest: './temp',
});

categoriesRouter.post('/', (req, res) => createCategoryController().handle(req, res));

categoriesRouter.get('/', (req, res) => listCategoriesController.handle(req, res));

categoriesRouter.post('/import', upload.single('file'), (req, res) => importCategoriesController.handle(req, res));

export default categoriesRouter;
