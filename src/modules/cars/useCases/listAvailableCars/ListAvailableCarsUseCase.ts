import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    category_id,
    brand,
    name,
  }: IRequest) {
    const cars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name,
    );
    return cars;
  }
}

export default ListAvailableCarsUseCase;
