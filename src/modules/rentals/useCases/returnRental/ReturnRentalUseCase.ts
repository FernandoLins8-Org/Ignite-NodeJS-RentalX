import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string
}

@injectable()
class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    const minimum_daily = 1;

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    const dateNow = this.dateProvider.dateNow();

    let dailies = this.dateProvider.daysBetweenDates(
      rental.start_date,
      dateNow,
    );

    if (dailies <= 0) {
      dailies = minimum_daily;
    }

    const delayToReturn = this.dateProvider.daysBetweenDates(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;
    if (delayToReturn > 0) {
      const fine = delayToReturn * car.fine_amount;
      total += fine;
    }
    total += dailies * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export default ReturnRentalUseCase;
