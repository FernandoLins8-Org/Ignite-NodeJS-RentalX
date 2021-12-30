import { Request, Response } from 'express';

import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, description } = req.body;

    await this.createCategoryUseCase.execute({
      name,
      description,
    });

    return res.status(201).send();
  }
}

export default CreateCategoryController;
