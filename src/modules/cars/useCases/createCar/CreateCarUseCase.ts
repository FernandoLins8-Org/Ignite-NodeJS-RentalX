import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}

export default CreateCarUseCase;
