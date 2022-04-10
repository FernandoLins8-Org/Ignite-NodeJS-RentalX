import { inject, injectable } from 'tsyringe';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalsUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest) {
    const dateNow = this.dateProvider.dateNow();
    const hoursBetweenDates = this.dateProvider.hoursBetweenDates(dateNow, expected_return_date);

    const minExpectedHour = 24;
    if (hoursBetweenDates < minExpectedHour) {
      throw new AppError('Rental minimum time is 24h');
    }

    const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(car_id);
    if (unavailableCar) {
      throw new AppError('Car is not available');
    }

    const rentalNotOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
    if (rentalNotOpenToUser) {
      throw new AppError('There is a rental open to the user already');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export default CreateRentalsUseCase;
