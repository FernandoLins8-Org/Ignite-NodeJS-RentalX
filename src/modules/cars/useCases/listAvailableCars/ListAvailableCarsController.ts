import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const { category_id, brand, name } = req.query;

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const availableCars = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });

    return res.json(availableCars);
  }
}

export default ListAvailableCarsController;
