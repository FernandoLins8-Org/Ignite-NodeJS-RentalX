import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCategoryUseCase from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    const categories = await listCategoryUseCase.execute();
    return res.json(categories);
  }
}

export default ListCategoriesController;
