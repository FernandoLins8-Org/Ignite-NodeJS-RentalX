import { Request, Response } from 'express';

import ListCategoryUseCase from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  handle(req: Request, res: Response) {
    const categories = this.listCategoryUseCase.execute();
    return res.json(categories);
  }
}

export default ListCategoriesController;
