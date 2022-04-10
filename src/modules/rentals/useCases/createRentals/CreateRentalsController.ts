import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalsUseCase from './CreateRentalsUseCase';

class CreateRentalsController {
  async handle(req: Request, res: Response) {
    const { car_id, expected_return_date } = req.body;
    const { user_id } = req;

    const createRentalsUseCase = container.resolve(CreateRentalsUseCase);

    await createRentalsUseCase.execute({
      car_id,
      user_id,
      expected_return_date,
    });

    return res.status(201).send();
  }
}

export default CreateRentalsController;
