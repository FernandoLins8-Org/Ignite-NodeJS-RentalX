import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  car_id: string
  specifications_ids: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specifications_ids }: IRequest) {
    const car = await this.carsRepository.findById(car_id);
    const specs = await this.specificationsRepository.findByIds(specifications_ids);

    if (!car) {
      throw new AppError('Car does not exist');
    }
    if (specs.length === 0) {
      throw new AppError('Specifications not found');
    }

    car.specifications = specs;
    await this.carsRepository.create(car);

    return car;
  }
}

export default CreateCarSpecificationUseCase;
