import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ImportCategoriesController from '@modules/cars/useCases/importCategories/ImportCategoriesController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouter = Router();
const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoriesController.handle);

categoriesRouter.post('/import', upload.single('file'), importCategoriesController.handle);

export default categoriesRouter;
